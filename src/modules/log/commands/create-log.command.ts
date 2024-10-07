import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateLogDto } from '../dtos/create-log.dto';
import { LogEntity } from '../log.entity';

export class CreateLogCommand implements ICommand {
  constructor(public readonly createLogDto: CreateLogDto) {}
}

@CommandHandler(CreateLogCommand)
export class CreateLogHandler
  implements ICommandHandler<CreateLogCommand, LogEntity>
{
  constructor(
    @InjectRepository(LogEntity)
    private logEntityRepository: Repository<LogEntity>,
  ) {}

  async execute(command: CreateLogCommand) {
    const { createLogDto } = command;
    const logEntity = this.logEntityRepository.create(createLogDto);

    await this.logEntityRepository.save(logEntity);

    return logEntity;
  }
}
