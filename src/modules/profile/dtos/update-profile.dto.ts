import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';

import { IProfile } from '../types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty({ example: 'profile' })
  @IsNotEmpty()
  @IsObject()
  profile: IProfile;
}
