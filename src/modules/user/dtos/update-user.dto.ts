import {
  EmailFieldOptional,
  PhoneFieldOptional,
  StringFieldOptional,
} from '../../../decorators';

export class UpdateUserDto {
  @StringFieldOptional()
  firstName?: string;

  @StringFieldOptional()
  lastName?: string;

  @EmailFieldOptional()
  email?: string;

  @StringFieldOptional()
  sub?: string;

  @PhoneFieldOptional()
  phoneNumber?: string;

  @StringFieldOptional()
  mailingAddress?: string;
}
