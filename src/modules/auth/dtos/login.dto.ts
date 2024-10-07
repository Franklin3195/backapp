import { EmailField, PasswordField } from '../../../decorators';
export class LoginDto {
  @EmailField()
  email: string;

  @PasswordField()
  password: string;
}
