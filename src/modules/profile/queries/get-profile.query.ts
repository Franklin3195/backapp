import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProfileNotFoundException } from '../exceptions/profile-not-found.exception';
import { ProfileEntity } from '../profile.entity';

export class GetProfileQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery> {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  async execute(query: GetProfileQuery): Promise<ProfileEntity> {
    const profileEntity = await this.profileEntityRepository.findOneBy({
      id: query.id,
    });

    if (!profileEntity) {
      throw new ProfileNotFoundException();
    }

    return profileEntity;
  }
}
