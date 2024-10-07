import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '../mail/mail.module';
import { CreateUserHandler } from './commands/create-user.command';
import { GetOrCreateUserBySubHandler } from './commands/get-or-create-user-by-sub.query';
import { UpdateUserHandler } from './commands/update-user.command';
import { GetUserHandler } from './queries/get-user.query';
import { GetUserByEmailHandler } from './queries/get-user-by-email.query';
import { GetUsersByRolesHandler } from './queries/get-users-by-roles.query';
import { GetUserSearchHandler } from './queries/search-query';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
export const handlers = [
  CreateUserHandler,
  GetUserHandler,
  GetUserByEmailHandler,
  GetUsersByRolesHandler,
  GetUserSearchHandler,
  GetOrCreateUserBySubHandler,
  UpdateUserHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
  providers: [UserService, ...handlers],
  controllers: [UserController],
})
export class UserModule {}
