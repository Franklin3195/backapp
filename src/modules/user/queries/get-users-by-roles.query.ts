import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { UserEntity } from '../user.entity';
import type { RoleType } from './../../../constants/role-type';

export class GetUsersByRolesQuery {
  constructor(public readonly roles: RoleType[]) {}
}

@QueryHandler(GetUsersByRolesQuery)
export class GetUsersByRolesHandler
  implements IQueryHandler<GetUsersByRolesQuery>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(query: GetUsersByRolesQuery): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: {
        role: {
          name: In(query.roles),
        },
      },
    });
  }
}
