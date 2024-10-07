import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import path from 'path';

import type { TemplateContext } from './../../constants/email-type';

@Injectable()
export class MailTemplateService {
  private compileTemplate(
    templateName: string,
    context: TemplateContext,
  ): string {
    const filePath = path.join(
      __dirname,
      'mail-templates',
      `${templateName}.hbs`,
    );
    const source = fs.readFileSync(filePath, 'utf8');
    const template = Handlebars.compile(source);

    return template(context);
  }

  textToHtml(text: string): string {
    let htmlText = text.replaceAll('\n\n', '</p><p>');
    htmlText = htmlText.replaceAll('\n', '<br>');

    return `<p>${htmlText}</p>`;
  }

  generateEmailContent(templateName: string, context: TemplateContext): string {
    return this.compileTemplate(templateName, context);
  }
}
