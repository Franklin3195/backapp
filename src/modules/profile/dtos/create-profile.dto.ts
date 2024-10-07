import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';

import { UserEntity } from '../../user/user.entity';
import { IProfile } from '../types';

export class CreateProfileDto {
  @ApiProperty({ example: 'Do not provide' })
  @IsOptional()
  user?: UserEntity;

  @ApiProperty({ example: 'profile' })
  @IsNotEmpty()
  @IsObject()
  profile: IProfile;
}
