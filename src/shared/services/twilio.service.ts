import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Twilio from 'twilio';

import { ApiConfigService } from './api-config.service';

@Injectable()
export class TwilioService {
  private client: Twilio.Twilio;

  private twilioPhoneNumber: string;

  constructor(private readonly apiConfigService: ApiConfigService) {
    const twilioConfig = this.apiConfigService.twilioConfig;

    if (
      !twilioConfig.accountSid ||
      !twilioConfig.authToken ||
      !twilioConfig.phoneNumber
    ) {
      throw new InternalServerErrorException('Twilio configuration is missing');
    }

    this.twilioPhoneNumber = twilioConfig.phoneNumber;

    this.client = Twilio(twilioConfig.accountSid, twilioConfig.authToken);
  }

  async sendSms(to: string, body: string): Promise<void> {
    await this.client.messages.create({
      body,
      from: this.twilioPhoneNumber,
      to,
    });
  }
}
