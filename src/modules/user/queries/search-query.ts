import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { UserEntity } from '../user.entity';

export class GetUserSearchQuery implements IQuery {
  constructor(public readonly search: string) {}
}

@QueryHandler(GetUserSearchQuery)
export class GetUserSearchHandler implements IQueryHandler<GetUserSearchQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async execute(query: GetUserSearchQuery) {
    const queryEntity = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.investor', 'investor')
      .leftJoinAndSelect('user.permissionGroup', 'permissionGroup')
      .orderBy('user.createdAt', 'DESC');

    // Exclude users with 'superadmin' and 'borrower' roles

    if (query.search) {
      queryEntity.andWhere(
        new Brackets((qb) => {
          qb.where('user.firstName LIKE :searchData')
            .orWhere('user.lastName LIKE :searchData')
            .orWhere('user.phoneNumber LIKE :searchData')
            .orWhere('user.email LIKE :searchData')
            .orWhere('user.mailingAddress LIKE :searchData')
            .orWhere('user.entityName LIKE :searchData')
            .orWhere('user.companyName LIKE :searchData')
            // Include this condition if you want to search within roles too, excluding 'superadmin' and 'borrower'
            .orWhere('role.name LIKE :searchData');
        }),
      );

      queryEntity.setParameter('searchData', `%${query.search}%`);
    } else {
      queryEntity.limit(3);
    }

    return queryEntity.getMany();
  }
}
