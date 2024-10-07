import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../user.entity';

export class CreateUserCommand implements ICommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, UserEntity>
{
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async execute(command: CreateUserCommand) {
    const { createUserDto } = command;
    const userEntity = this.userRepository.create(createUserDto);

    await this.userRepository.save(userEntity);

    return userEntity;
  }
}
