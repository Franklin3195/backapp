import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class SMSService {
  private readonly sns: SNSClient;

  constructor() {
    this.sns = new SNSClient({});
  }

  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    const publishCommand = new PublishCommand({
      PhoneNumber: phoneNumber,
      Message: message,
    });

    try {
      await this.sns.send(publishCommand);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
