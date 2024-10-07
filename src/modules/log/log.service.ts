import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { LogAction } from '../../constants';
import { CreateLogCommand } from './commands/create-log.command';
import { CreateLogDto } from './dtos/create-log.dto';
import type { LogDto } from './dtos/log.dto';
import type { LogPageOptionsDto } from './dtos/log-page-options.dto';
import type { UpdateLogDto } from './dtos/update-log.dto';
import type { UserActivityLogRequest } from './dtos/user-activity-log-request.dto';
import { LogNotFoundException } from './exceptions/log-not-found.exception';
import { LogEntity } from './log.entity';
import { GetLogQuery } from './queries/get-log.query';
@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogEntity)
    private logEntityRepository: Repository<LogEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  createLog(createLogDto: CreateLogDto): Promise<LogEntity> {
    return this.commandBus.execute<CreateLogCommand, LogEntity>(
      new CreateLogCommand(createLogDto),
    );
  }

  async getAllLog(
    logPageOptionsDto: LogPageOptionsDto,
  ): Promise<PageDto<LogDto>> {
    const queryBuilder =
      this.logEntityRepository.createQueryBuilder('logEntity');
    const [items, pageMetaDto] = await queryBuilder.paginate(logPageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getUserActivity(
    userActivityLogRequest: UserActivityLogRequest,
  ): Promise<unknown> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const endDate = userActivityLogRequest.endDate;

    //make anew variable and set 1 month before the end date
    const startDate = new Date(endDate);

    startDate.setMonth(endDate.getMonth() - 1);

    const userActivity = await this.logEntityRepository
      .createQueryBuilder('logEntity')
      .where('logEntity.user_id = :id', { id: userActivityLogRequest.id })
      .andWhere('DATE(logEntity.createdAt) BETWEEN :startDate AND :endDate', {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      })
      .select('sum(TIMESTAMPDIFF(MINUTE, created_at, updated_at ) )', 'minutes')
      .addSelect('DATE(created_at)', 'date')
      .groupBy('DATE(created_at)')
      .orderBy('DATE(created_at)')
      .limit(30)
      .getRawMany();

    const numberOfLogins = await this.logEntityRepository
      .createQueryBuilder('logEntity')
      .select('COUNT(*)', 'logins')
      .addSelect('DATE(created_at)', 'date')
      .where('logEntity.user_id = :id', { id: userActivityLogRequest.id })
      .andWhere('logEntity.event = :event', { event: LogAction.USER_LOGIN })
      .andWhere('DATE(logEntity.createdAt) BETWEEN :startDate AND :endDate', {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      })
      .groupBy('DATE(created_at)')
      .orderBy('DATE(created_at)', 'ASC')
      .getRawMany();

    const lastLogin = await this.logEntityRepository
      .createQueryBuilder('logEntity')
      .where('logEntity.user_id = :id', { id: userActivityLogRequest.id })
      .andWhere('logEntity.event = :event', { event: LogAction.USER_LOGIN })
      .orderBy('logEntity.createdAt', 'DESC')

      .getOne();

    return {
      userActivity,
      numberOfLogins,
      lastLogin,
    };
  }

  async getSingleLog(id: Uuid): Promise<LogEntity> {
    return this.queryBus.execute<GetLogQuery, LogEntity>(new GetLogQuery(id));
  }

  async updateLog(id: Uuid, updateLogDto: UpdateLogDto): Promise<void> {
    const queryBuilder = this.logEntityRepository
      .createQueryBuilder('logEntity')
      .where('logEntity.id = :id', { id });

    const logEntityEntity = await queryBuilder.getOne();

    if (!logEntityEntity) {
      throw new LogNotFoundException();
    }

    this.logEntityRepository.merge(logEntityEntity, updateLogDto);

    await this.logEntityRepository.save(updateLogDto);
  }

  async deleteLog(id: Uuid): Promise<void> {
    const deleteResult = await this.logEntityRepository.softDelete(id);

    if (deleteResult.affected === 0) {
      throw new LogNotFoundException();
    }
  }
}
