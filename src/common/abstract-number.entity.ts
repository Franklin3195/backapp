import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Constructor } from '../types';
import type { AbstractNumberDto } from './dto/abstract-number.dto';

export abstract class AbstractNumberEntity<
  DTO extends AbstractNumberDto = AbstractNumberDto,
  O = never,
> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedBy?: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  private dtoClass?: Constructor<DTO, [AbstractNumberEntity, O?]>;

  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }

    return new dtoClass(this, options);
  }
}
