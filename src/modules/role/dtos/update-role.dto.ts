import { StringField, StringFieldOptional } from '../../../decorators';

export class UpdateRoleDto {
  @StringField()
  name: string;

  @StringFieldOptional()
  description?: string;
}
