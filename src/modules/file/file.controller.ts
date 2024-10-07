import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth } from '../../decorators';
import { S3Service } from './../../shared/services/s3.service';

@Controller('files')
@ApiTags('files')
export class FileController {
  constructor(private readonly s3Service: S3Service) {}

  @Get('/download/:key')
  @ApiOperation({
    summary: 'Get a presigned URL for downloading a specific file by key',
  })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getPresignedUrl(@Param('key') key: string): Promise<string> {
    return this.s3Service.getPresignedUrl(key);
  }
}
