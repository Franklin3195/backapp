import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { LogAction, LogTable } from '../../constants';
import { UseDto } from '../../decorators';
import { UserEntity } from '../user/user.entity';
import type { ILogDtoOptions } from './dtos/log.dto';
import { LogDto } from './dtos/log.dto';

@Entity({ name: 'logs' })
@UseDto(LogDto)
export class LogEntity extends AbstractEntity<LogDto, ILogDtoOptions> {
  @Column()
  ipAddress: string;

  @Column({
    type: 'enum',
    enum: LogTable,
  })
  entity: LogTable;

  @Column({
    type: 'enum',
    enum: LogAction,
  })
  event: LogAction;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
