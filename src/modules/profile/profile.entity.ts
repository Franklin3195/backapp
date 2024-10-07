/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { UserEntity } from '../user/user.entity';
import type { IProfileDtoOptions } from './dtos/profile.dto';
import { ProfileDto } from './dtos/profile.dto';

@Entity({ name: 'profiles' })
@UseDto(ProfileDto)
export class ProfileEntity extends AbstractEntity<
  ProfileDto,
  IProfileDtoOptions
> {
  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'json', nullable: true })
  profile: any;
}
