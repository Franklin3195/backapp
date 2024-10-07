import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuditLogEntity } from './audit-log.entity';
import { CreateAuditLogHandler } from './commands/create-audit-log.command';
import { CreateLogHandler } from './commands/create-log.command';
import { LogController } from './log.controller';
import { LogEntity } from './log.entity';
import { LogService } from './log.service';
import { GetLogHandler } from './queries/get-log.query';

export const handlers = [
  CreateLogHandler,
  GetLogHandler,
  CreateAuditLogHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([LogEntity]),
    TypeOrmModule.forFeature([AuditLogEntity]),
  ],
  providers: [LogService, ...handlers],
  controllers: [LogController],
})
export class LogModule {}
