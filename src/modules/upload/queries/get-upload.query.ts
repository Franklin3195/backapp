import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UploadNotFoundException } from '../exceptions/upload-not-found.exception';
import { UploadEntity } from '../upload.entity';

export class GetUploadQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetUploadQuery)
export class GetUploadHandler implements IQueryHandler<GetUploadQuery> {
  constructor(
    @InjectRepository(UploadEntity)
    private uploadEntityRepository: Repository<UploadEntity>,
  ) {}

  async execute(query: GetUploadQuery): Promise<UploadEntity> {
    const uploadEntity = await this.uploadEntityRepository.findOneBy({
      id: query.id,
    });

    if (!uploadEntity) {
      throw new UploadNotFoundException();
    }

    return uploadEntity;
  }
}
