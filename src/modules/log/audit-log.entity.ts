/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'audit-logs' })
export class AuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @Column()
  action: 'create' | 'update' | 'delete';

  @Column()
  entityId: string;

  @Column()
  entityName: string;

  @Column({ type: 'json', nullable: true })
  changes: any;

  @Column({ nullable: true })
  userId: Uuid;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
