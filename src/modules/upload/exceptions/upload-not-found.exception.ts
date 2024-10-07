import { NotFoundException } from '@nestjs/common';

export class UploadNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.uploadNotFound', error);
  }
}
