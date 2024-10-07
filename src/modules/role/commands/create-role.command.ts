import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateRoleDto } from '../dtos/create-role.dto';
import { RoleEntity } from '../role.entity';

export class CreateRoleCommand implements ICommand {
  constructor(public readonly createRoleDto: CreateRoleDto) {}
}

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler
  implements ICommandHandler<CreateRoleCommand, RoleEntity>
{
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async execute(command: CreateRoleCommand) {
    const { createRoleDto } = command;
    const roleEntity = this.roleRepository.create(createRoleDto);

    await this.roleRepository.save(roleEntity);

    return roleEntity;
  }
}
