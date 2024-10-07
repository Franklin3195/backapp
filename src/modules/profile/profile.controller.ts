import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import { UserEntity } from '../user/user.entity';
import { CreateProfileDto } from './dtos/create-profile.dto';
import type { ProfileDto } from './dtos/profile.dto';
import { ProfileService } from './profile.service';
@Controller('profiles')
@ApiTags('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create a profile' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createProfile(
    @AuthUser() user: UserEntity,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    createProfileDto.user = user;
    const entity = await this.profileService.createProfile(
      user,
      createProfileDto,
    );

    return entity.toDto();
  }

  @Get()
  @ApiOperation({ summary: 'get profile by auth user' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getProfile(@AuthUser() user: UserEntity): Promise<ProfileDto> {
    return this.profileService.getSingleProfileByUser(user.id);
  }
}
