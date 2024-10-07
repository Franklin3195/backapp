import { Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { MailTemplateService } from './mail-template.service';

export const providers = [MailService, MailTemplateService];

@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
  controllers: [],
})
export class MailModule {}
