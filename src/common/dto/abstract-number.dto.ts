import { ApiProperty } from '@nestjs/swagger';
import type { AbstractNumberEntity } from 'common/abstract-number.entity';

export class AbstractNumberDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    nullable: true,
  })
  deletedAt?: Date | null;

  constructor(
    entity: AbstractNumberEntity,
    options?: { excludeFields?: boolean },
  ) {
    if (!options?.excludeFields) {
      this.id = entity.id;
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
      this.deletedAt = entity.deletedAt;
    }
  }
}
