import {
  EmailField,
  PhoneField,
  StringField,
  StringFieldOptional,
} from '../../../decorators';

export class CreateUserDto {
  @StringField()
  firstName: string;

  @StringField()
  lastName: string;

  @StringFieldOptional()
  entityName?: string;

  @StringFieldOptional()
  companyName?: string;

  @EmailField()
  email: string;

  @PhoneField()
  phoneNumber: string;

  @StringField()
  mailingAddress: string;
}
