import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProfileEntity } from '../profile.entity';

export class GetProfileByUserQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetProfileByUserQuery)
export class GetProfileByUserHandler
  implements IQueryHandler<GetProfileByUserQuery>
{
  constructor(
    @InjectRepository(ProfileEntity)
    private profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  async execute(query: GetProfileByUserQuery): Promise<ProfileEntity | null> {
    return this.profileEntityRepository.findOneBy({
      user: {
        id: query.id,
      },
    });
  }
}
