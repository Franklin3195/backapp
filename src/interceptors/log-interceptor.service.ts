import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { LogAction, LogTable } from '../constants';
import type { CreateLogDto } from '../modules/log/dtos/create-log.dto';
import { createLog } from '../modules/log/queries/raw/create-log';
import { getLogByUserAndDate } from '../modules/log/queries/raw/get-log-by-user-and-date';
import { updateLogById } from '../modules/log/queries/raw/update-log-by-id';
@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(
    private dataSource: DataSource,
    private queryBus: QueryBus,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    await this.getLogData(request.user.id as Uuid, request.ip as string);

    return next.handle();
  }

  private async getLogData(userId: Uuid, ipAddress: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    const date = new Date().toISOString().slice(0, 10);
    const result = await queryRunner.query(getLogByUserAndDate(), [
      userId,
      date,
    ]);

    await queryRunner.startTransaction();

    if (result.length > 0) {
      await queryRunner.query(updateLogById(), [result[0].id]);
    } else {
      const log: CreateLogDto = {
        event: LogAction.USER_LOGIN,
        entity: LogTable.USER,
        ipAddress,
        user: {
          id: userId,
        },
      };
      await queryRunner.query(createLog(), [
        uuid(),
        log.event,
        log.entity,
        log.ipAddress,
        log.user.id,
      ]);
    }

    try {
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
