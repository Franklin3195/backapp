import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUploadHandler } from './commands/create-upload.command';
import { GetUploadHandler } from './queries/get-upload.query';
import { UploadController } from './upload.controller';
import { UploadEntity } from './upload.entity';
import { UploadService } from './upload.service';

export const handlers = [CreateUploadHandler, GetUploadHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UploadEntity])],
  providers: [UploadService, ...handlers],
  controllers: [UploadController],
})
export class UploadModule {}
