import { NotFoundException } from '@nestjs/common';

export class LogNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.logNotFound', error);
  }
}
