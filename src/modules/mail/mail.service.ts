import {
  SendEmailCommand,
  SendRawEmailCommand,
  SESClient,
} from '@aws-sdk/client-ses';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import type { IEmailType, TemplateContext } from '../../constants/email-type';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { MailTemplateService } from './mail-template.service';
import type { IAttachment } from './types/mails.types';

@Injectable()
export class MailService {
  private readonly ses: SESClient;

  constructor(
    public configService: ApiConfigService,
    private readonly emailTemplateService: MailTemplateService,
  ) {
    this.ses = new SESClient({ region: configService.awsRegion });
  }

  generateEmailContentTest(
    templateName: string,
    context: TemplateContext,
  ): string {
    return this.emailTemplateService.generateEmailContent(
      templateName,
      context,
    );
  }

  async sendEmail(data: IEmailType): Promise<boolean> {
    if (this.configService.isLocalTest) {
      return true;
    }

    const html = this.emailTemplateService.generateEmailContent(
      data.templateName,
      data.context,
    );

    const sendEmailCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [data.to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'utf8',
            Data: html,
          },
        },
        Subject: {
          Data: data.subject,
        },
      },
      Source: data.from,
    });

    try {
      await this.ses.send(sendEmailCommand);

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendRawEmail(data: IEmailType, attachment: IAttachment): Promise<void> {
    const html = this.emailTemplateService.generateEmailContent(
      data.templateName,
      data.context,
    );

    const rawMessageData =
      `Subject: ${data.subject}\n` +
      `MIME-Version: 1.0\n` +
      `Content-Type: multipart/mixed;\n` +
      `    boundary="----=_MIME_BOUNDARY_"\n\n` +
      `------=_MIME_BOUNDARY_\n` +
      `Content-Type: text/html; charset=UTF-8\n` +
      `Content-Disposition: inline\n` +
      `Content-Transfer-Encoding: 7bit\n\n` +
      `${html}\n\n` +
      `------=_MIME_BOUNDARY_\n` +
      `Content-Type: application/octet-stream\n` +
      `Content-Disposition: attachment; filename="${attachment.filename}"\n` +
      `Content-Transfer-Encoding: base64\n\n` +
      attachment.content;

    const sendRawEmailCommand = new SendRawEmailCommand({
      Destinations: [data.to],

      Source: data.from,
      RawMessage: {
        Data: Buffer.from(rawMessageData.trim()),
      },
    });

    try {
      await this.ses.send(sendRawEmailCommand);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendAdminInvitation(to: string, userName: string): Promise<void> {
    const data: IEmailType = {
      to,
      subject: 'AppYudame Invitation Admin',
      from: 'info@appyudame.com',
      templateName: 'admin-invitation',
      context: {
        app_user_name: userName,
        app_link: `${this.configService.appLaunchBaseUrl}first-login?email=${to}`,
      },
    };

    await this.sendEmail(data);
  }

  async sendInvestorInvitation(to: string, userName: string): Promise<void> {
    const data: IEmailType = {
      to,
      subject: 'AppYudame Invitation',
      from: 'info@appyudame.com',
      templateName: 'investor-invitation',
      context: {
        app_user_name: userName,
        app_link: `${this.configService.appLaunchBaseUrl}first-login?email=${to}`,
      },
    };

    await this.sendEmail(data);
  }

  async sendAccountInvitation(to: string, userName: string): Promise<void> {
    const data: IEmailType = {
      to,
      subject: 'AppYudame Invitation',
      from: 'info@appyudame.com',
      templateName: 'account-invitation',
      context: {
        app_user_name: userName,
        app_link: `${this.configService.appLaunchBaseUrl}first-login?email=${to}`,
      },
    };

    await this.sendEmail(data);
  }

  async sendOpportunityNotification(
    to: string,
    content: string,
  ): Promise<void> {
    const convertedContent = this.emailTemplateService.textToHtml(content);

    const data: IEmailType = {
      to,
      subject: 'New Investment Opportunity',
      from: 'info@appyudame.com',
      templateName: 'opportunity-notification',
      context: {
        app_content: convertedContent,
      },
    };

    await this.sendEmail(data);
  }

  async sendInvoiceNotification(
    to: string,
    content: string,
    file: string,
  ): Promise<void> {
    const convertedContent = this.emailTemplateService.textToHtml(content);

    const data: IEmailType = {
      to,
      subject: 'Invoice Notification',
      from: 'info@appyudame.com',
      templateName: 'invoice',
      context: {
        app_content: convertedContent,
      },
    };

    const attachment: IAttachment = {
      encoding: 'base64',
      filename: 'invoice.pdf',
      content: file,
      contentType: 'application/pdf',
    };

    await this.sendRawEmail(data, attachment);
  }
}
