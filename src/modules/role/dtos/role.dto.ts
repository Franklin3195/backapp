import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { RoleEntity } from '../role.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoleDtoOptions {}

export class RoleDto extends AbstractDto {
  name: string;

  description?: string;

  constructor(entity: RoleEntity, _options?: IRoleDtoOptions) {
    super(entity);
    this.name = entity.name;
    this.description = entity.description;
  }
}
