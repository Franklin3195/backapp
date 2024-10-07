import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuditLogEntity } from '../audit-log.entity';

export class CreateAuditLogCommand implements ICommand {
  constructor(public readonly userId: Uuid) {}
}

@CommandHandler(CreateAuditLogCommand)
export class CreateAuditLogHandler
  implements ICommandHandler<CreateAuditLogCommand, AuditLogEntity>
{
  constructor(
    @InjectRepository(AuditLogEntity)
    private logEntityRepository: Repository<AuditLogEntity>,
  ) {}

  async execute(command: CreateAuditLogCommand) {
    const { userId } = command;
    const logData = this.logEntityRepository.create({
      action: 'create',
      changes: {},
      entityId: 'forbiden',
      entityName: 'forbiden',
      userId,
    });

    return this.logEntityRepository.save(logData);
  }
}
