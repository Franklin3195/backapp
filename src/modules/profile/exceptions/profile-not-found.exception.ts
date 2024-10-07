import { NotFoundException } from '@nestjs/common';

export class ProfileNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.profileNotFound', error);
  }
}
