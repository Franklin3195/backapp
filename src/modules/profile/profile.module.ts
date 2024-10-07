import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateProfileHandler } from './commands/create-profile.command';
import { ProfileController } from './profile.controller';
import { ProfileEntity } from './profile.entity';
import { ProfileService } from './profile.service';
import { GetProfileHandler } from './queries/get-profile.query';
import { GetProfileByUserHandler } from './queries/get-profile-by-user.query';

export const handlers = [
  CreateProfileHandler,
  GetProfileHandler,
  GetProfileByUserHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [ProfileService, ...handlers],
  controllers: [ProfileController],
})
export class ProfileModule {}
