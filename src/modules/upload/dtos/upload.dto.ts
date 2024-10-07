import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { UploadEntity } from '../upload.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUploadDtoOptions {}

export class UploadDto extends AbstractDto {
  constructor(entityName: UploadEntity, _options?: IUploadDtoOptions) {
    super(entityName);
  }
}
