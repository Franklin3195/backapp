import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { ProfileEntity } from '../profile.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProfileDtoOptions {}

export class ProfileDto extends AbstractDto {
  constructor(entityName: ProfileEntity, _options?: IProfileDtoOptions) {
    super(entityName);
  }
}
