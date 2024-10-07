import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { UpdateUserCommand } from '../user/commands/update-user.command';
import type { UpdateUserDto } from '../user/dtos/update-user.dto';
import { UserEntity } from '../user/user.entity';
import { CreateProfileCommand } from './commands/create-profile.command';
import { CreateProfileDto } from './dtos/create-profile.dto';
import type { ProfileDto } from './dtos/profile.dto';
import type { ProfilePageOptionsDto } from './dtos/profile-page-options.dto';
import type { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileNotFoundException } from './exceptions/profile-not-found.exception';
import { ProfileEntity } from './profile.entity';
import { GetProfileQuery } from './queries/get-profile.query';
import { GetProfileByUserQuery } from './queries/get-profile-by-user.query';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  async createProfile(
    user: UserEntity,
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    await this.commandBus.execute<UpdateUserCommand, UserEntity>(
      new UpdateUserCommand(user.id, {
        ...createProfileDto.profile,
      } as UpdateUserDto),
    );
    const profile = await this.commandBus.execute<
      CreateProfileCommand,
      ProfileEntity
    >(new CreateProfileCommand(user, createProfileDto));
    void this.queryBus.execute;

    return profile;
  }

  async getAllProfile(
    profilePageOptionsDto: ProfilePageOptionsDto,
  ): Promise<PageDto<ProfileDto>> {
    const queryBuilder = this.profileRepository.createQueryBuilder('profile');
    const [items, pageMetaDto] = await queryBuilder.paginate(
      profilePageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSingleProfile(id: Uuid): Promise<ProfileEntity> {
    return this.queryBus.execute<GetProfileQuery, ProfileEntity>(
      new GetProfileQuery(id),
    );
  }

  async getSingleProfileByUser(id: Uuid): Promise<ProfileEntity> {
    return this.queryBus.execute<GetProfileByUserQuery, ProfileEntity>(
      new GetProfileByUserQuery(id),
    );
  }

  async updateProfile(
    userId: Uuid,
    updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    const queryBuilder = this.profileRepository
      .createQueryBuilder('profile')
      .where('profile.user_id = :id', { userId });
    const profileEntity = await queryBuilder.getOne();

    if (!profileEntity) {
      throw new ProfileNotFoundException();
    }

    this.profileRepository.merge(profileEntity, updateProfileDto);
    await this.profileRepository.save(profileEntity);
  }

  async deleteProfile(id: Uuid): Promise<void> {
    const deleteResult = await this.profileRepository.softDelete(id);

    if (deleteResult.affected === 0) {
      throw new ProfileNotFoundException();
    }
  }
}
