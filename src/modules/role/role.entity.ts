import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { UserEntity } from '../user/user.entity';
import type { IRoleDtoOptions } from './dtos/role.dto';
import { RoleDto } from './dtos/role.dto';

@Entity({ name: 'roles' })
@UseDto(RoleDto)
export class RoleEntity extends AbstractEntity<RoleDto, IRoleDtoOptions> {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  /*   @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable()
  permissions: PermissionEntity[]; */
}
