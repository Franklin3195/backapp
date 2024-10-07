import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { UpdateUserDto } from '../dtos/update-user.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserEntity } from '../user.entity';
export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: Uuid,
    public readonly updateUserDto: UpdateUserDto,
  ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, UserEntity>
{
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async execute(command: UpdateUserCommand) {
    const { id, updateUserDto } = command;
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException();
    }

    this.userRepository.merge(user, updateUserDto);

    return this.userRepository.save(user);
  }
}
