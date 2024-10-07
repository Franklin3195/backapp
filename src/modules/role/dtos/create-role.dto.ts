import { StringField, StringFieldOptional } from '../../../decorators';

export class CreateRoleDto {
  @StringField()
  name: string;

  @StringFieldOptional()
  description?: string;
}
