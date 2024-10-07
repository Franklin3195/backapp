import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LogNotFoundException } from '../../log/exceptions/log-not-found.exception';
import { LogEntity } from '../../log/log.entity';

export class GetLogByIdDateQuery implements ICommand {
  constructor(
    public readonly id: string,
    public readonly date: Date,
  ) {}
}

@QueryHandler(GetLogByIdDateQuery)
export class GetLogBySubHandler implements IQueryHandler<GetLogByIdDateQuery> {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  async execute(query: GetLogByIdDateQuery): Promise<LogEntity> {
    const logEntity = await this.logRepository.findOne({
      where: { createdAt: query.date },
    });

    if (!logEntity) {
      throw new LogNotFoundException();
    }

    return logEntity;
  }
}
