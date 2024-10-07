import type { Provider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ApiConfigService } from './services/api-config.service';
import { GeneratorService } from './services/generator.service';
import { S3Service } from './services/s3.service';
import { SMSService } from './services/sms.service';
import { TestService } from './services/test.service';
import { TwilioService } from './services/twilio.service';
import { ValidatorService } from './services/validator.service';

const providers: Provider[] = [
  SMSService,
  S3Service,
  ApiConfigService,
  ValidatorService,
  GeneratorService,
  TwilioService,
  TestService,
];

@Global()
@Module({
  providers,
  imports: [CqrsModule],
  exports: [...providers, CqrsModule],
})
export class SharedModule {}
