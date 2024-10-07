import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity } from '../role.entity';

export class GetRoleQuery implements IQuery {
  constructor(public readonly roleName: string) {}
}

@QueryHandler(GetRoleQuery)
export class GetRoleHandler implements IQueryHandler<GetRoleQuery> {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async execute(query: GetRoleQuery) {
    return this.roleRepository.findOne({ where: { name: query.roleName } });
  }
}
