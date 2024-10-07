import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { UserEntity } from '../user.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserDtoOptions {}

export class UserDto extends AbstractDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  sub: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  mailingAddress: string;

  constructor(user: UserEntity, _options?: IUserDtoOptions) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.sub = user.sub;
    this.phoneNumber = user.phoneNumber;
    this.mailingAddress = user.mailingAddress;
  }
}
