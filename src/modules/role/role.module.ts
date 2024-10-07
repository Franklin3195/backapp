import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateRoleHandler } from './commands/create-role.command';
import { GetRoleHandler } from './queries/get-role.query';
import { RoleController } from './role.controller';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

export const handlers = [CreateRoleHandler, GetRoleHandler];

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService, ...handlers],
  controllers: [RoleController],
})
export class RoleModule {}
