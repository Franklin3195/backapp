import { Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import type { IUploadDtoOptions } from './dtos/upload.dto';
import { UploadDto } from './dtos/upload.dto';

@Entity({ name: 'uploads' })
@UseDto(UploadDto)
export class UploadEntity extends AbstractEntity<
  UploadDto,
  IUploadDtoOptions
> {}
