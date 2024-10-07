import { NotFoundException } from '@nestjs/common';

export class FileNotStoredInS3Exception extends NotFoundException {
  constructor(error?: string) {
    super('The provided s3 key does not exist in S3.', error);
  }
}
