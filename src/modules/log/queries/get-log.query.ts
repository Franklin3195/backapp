import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LogNotFoundException } from '../exceptions/log-not-found.exception';
import { LogEntity } from '../log.entity';

export class GetLogQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetLogQuery)
export class GetLogHandler implements IQueryHandler<GetLogQuery> {
  constructor(
    @InjectRepository(LogEntity)
    private logEntityRepository: Repository<LogEntity>,
  ) {}

  async execute(query: GetLogQuery): Promise<LogEntity> {
    const logEntity = await this.logEntityRepository.findOneBy({
      id: query.id,
    });

    if (!logEntity) {
      throw new LogNotFoundException();
    }

    return logEntity;
  }
}
