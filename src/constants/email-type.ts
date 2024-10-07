export type TemplateContext = Record<string, string | number | boolean>;

export interface IEmailType {
  to: string;
  subject: string;
  templateName: string;
  context: TemplateContext;
  from: string;
}

export interface IEmail {
  to: string;
  subject: string;
  templateName: string;
  html: string;
  from: string;
}

export const emailFrom = 'info@appyudame.com';
