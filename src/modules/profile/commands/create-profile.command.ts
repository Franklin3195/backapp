import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { UserEntity } from '../../user/user.entity';
import type { CreateProfileDto } from '../dtos/create-profile.dto';
import { ProfileEntity } from '../profile.entity';

export class CreateProfileCommand implements ICommand {
  constructor(
    public readonly user: UserEntity,
    public readonly createProfileDto: CreateProfileDto,
  ) {}
}

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand, ProfileEntity>
{
  constructor(
    @InjectRepository(ProfileEntity)
    private profileEntityRepository: Repository<ProfileEntity>,
  ) {}

  async execute(command: CreateProfileCommand) {
    const { user, createProfileDto } = command;

    const profile = await this.profileEntityRepository.findOneBy({
      user: {
        id: user.id,
      },
    });

    const profileEntity = profile
      ? this.profileEntityRepository.merge(profile, createProfileDto)
      : this.profileEntityRepository.create({
          ...createProfileDto,
          user,
        });

    await this.profileEntityRepository.save(profileEntity);

    return profileEntity;
  }
}
