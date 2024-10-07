import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { RoleEntity } from '../role/role.entity';
import type { IUserDtoOptions } from './dtos/user.dto';
import { UserDto } from './dtos/user.dto';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, IUserDtoOptions> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  sub: string;

  @Column()
  phoneNumber: string;

  @Column()
  mailingAddress: string;

  @Column()
  isActive: boolean;

  @Column({ nullable: true, default: null })
  acceptedCondition: boolean;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;
}
