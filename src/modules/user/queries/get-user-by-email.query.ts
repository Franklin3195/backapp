import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserEntity } from '../user.entity';

export class GetUserByEmailQuery implements ICommand {
  constructor(public readonly email: string) {}
}

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOne({
      where: { email: query.email },
      relations: ['role'],
    });

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }
}
