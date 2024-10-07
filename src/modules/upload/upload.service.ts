import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { CreateUploadCommand } from './commands/create-upload.command';
import { CreateUploadDto } from './dtos/create-upload.dto';
import type { UpdateUploadDto } from './dtos/update-upload.dto';
import type { UploadDto } from './dtos/upload.dto';
import type { UploadPageOptionsDto } from './dtos/upload-page-options.dto';
import { UploadNotFoundException } from './exceptions/upload-not-found.exception';
import { GetUploadQuery } from './queries/get-upload.query';
import { UploadEntity } from './upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private uploadRepository: Repository<UploadEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  createUpload(createUploadDto: CreateUploadDto): Promise<UploadEntity> {
    return this.commandBus.execute<CreateUploadCommand, UploadEntity>(
      new CreateUploadCommand(createUploadDto),
    );
  }

  async getAllUpload(
    uploadPageOptionsDto: UploadPageOptionsDto,
  ): Promise<PageDto<UploadDto>> {
    const queryBuilder = this.uploadRepository.createQueryBuilder('upload');
    const [items, pageMetaDto] =
      await queryBuilder.paginate(uploadPageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getSingleUpload(id: Uuid): Promise<UploadEntity> {
    return this.queryBus.execute<GetUploadQuery, UploadEntity>(
      new GetUploadQuery(id),
    );
  }

  async updateUpload(
    id: Uuid,
    updateUploadDto: UpdateUploadDto,
  ): Promise<void> {
    const queryBuilder = this.uploadRepository
      .createQueryBuilder('upload')
      .where('upload.id = :id', { id });

    const uploadEntity = await queryBuilder.getOne();

    if (!uploadEntity) {
      throw new UploadNotFoundException();
    }

    this.uploadRepository.merge(uploadEntity, updateUploadDto);

    await this.uploadRepository.save(uploadEntity);
  }

  async deleteUpload(id: Uuid): Promise<void> {
    const deleteResult = await this.uploadRepository.softDelete(id);

    if (deleteResult.affected === 0) {
      throw new UploadNotFoundException();
    }
  }
}
