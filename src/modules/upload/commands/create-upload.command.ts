import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateUploadDto } from '../dtos/create-upload.dto';
import { UploadEntity } from '../upload.entity';

export class CreateUploadCommand implements ICommand {
  constructor(public readonly createUploadDto: CreateUploadDto) {}
}

@CommandHandler(CreateUploadCommand)
export class CreateUploadHandler
  implements ICommandHandler<CreateUploadCommand, UploadEntity>
{
  constructor(
    @InjectRepository(UploadEntity)
    private uploadEntityRepository: Repository<UploadEntity>,
  ) {}

  async execute(command: CreateUploadCommand) {
    const { createUploadDto } = command;
    const uploadEntity = this.uploadEntityRepository.create(createUploadDto);

    await this.uploadEntityRepository.save(uploadEntity);

    return uploadEntity;
  }
}
