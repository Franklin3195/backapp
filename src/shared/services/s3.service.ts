import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import mime from 'mime-types';

import type { IFile } from '../../interfaces';
import type { S3Folders } from './../../constants/s3-folder-type';
import { ApiConfigService } from './api-config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor(
    public configService: ApiConfigService,
    public generatorService: GeneratorService,
  ) {
    const awsS3Config = configService.awsS3Config;

    this.s3 = new S3({
      region: awsS3Config.bucketRegion,
    });
  }

  async uploadFile(file: IFile, folder: S3Folders): Promise<string> {
    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );
    const key = `${folder}/${fileName}`;

    const putCommand = new PutObjectCommand({
      Bucket: this.configService.awsS3Config.bucketName,
      Body: file.buffer,
      Key: key,
      ContentType: file.mimetype,
    });

    await this.s3.send(putCommand);

    return key;
  }

  async uploadFileOriginal(
    file: IFile,
    folder: S3Folders,
    subFolder?: string,
  ): Promise<string> {
    const key = `${folder}${subFolder ? '/' + subFolder : ''}/${
      file.originalname
    }`;

    const putCommand = new PutObjectCommand({
      Bucket: this.configService.awsS3Config.bucketName,
      Body: file.buffer,
      Key: key,
      ContentType: file.mimetype,
    });

    await this.s3.send(putCommand);

    return key;
  }

  async getPresignedUrl(key: string, expirationMinutes = 60): Promise<string> {
    if (!key) {
      throw new TypeError('key is required');
    }

    const getObjectCommand = new GetObjectCommand({
      Bucket: this.configService.awsS3Config.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3, getObjectCommand, {
      expiresIn: expirationMinutes * 60,
    });
  }

  async isFileStored(key: string): Promise<boolean> {
    try {
      const headCommand = new HeadObjectCommand({
        Bucket: this.configService.awsS3Config.bucketName,
        Key: key,
      });

      await this.s3.send(headCommand);

      return true;
    } catch (error) {
      if (error.name === 'NotFound') {
        return false;
      }

      throw error;
    }
  }
}
