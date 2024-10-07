import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { PageDto } from '../../common/dto/page.dto';
import { CreateAuditLogCommand } from '../../modules/log/commands/create-audit-log.command';
import { MailService } from '../mail/mail.service';
import { CreateUserCommand } from './commands/create-user.command';
import { CreateUserDto } from './dtos/create-user.dto';
import type { FilterDataDto } from './dtos/filter-data.dto';
import type { UpdateUserDto } from './dtos/update-user.dto';
import type { UserDto } from './dtos/user.dto';
import type { UserPageOptionsDto } from './dtos/user-page-options.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private mailService: MailService,
  ) {}

  @Transactional()
  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.commandBus.execute<CreateUserCommand, UserEntity>(
      new CreateUserCommand(createUserDto),
    );
  }

  async getAllUser(
    userPageOptionsDto: UserPageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const [items, pageMetaDto] =
      await queryBuilder.paginate(userPageOptionsDto);

    return new PageDto(items, pageMetaDto);
  }

  async getMyInfo(user: UserEntity): Promise<UserEntity> {
    const userId = user.id;
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id: userId });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  async getFilterUsers(filterDataDto: FilterDataDto): Promise<UserEntity[]> {
    const { role, searchData } = filterDataDto;
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.permissionGroup', 'permissionGroup')
      .orderBy('user.createdAt', 'DESC');

    if (role) {
      query.andWhere('role.name = :role', { role });
    }

    if (searchData) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('user.firstName LIKE :searchData')
            .orWhere('user.lastName LIKE :searchData')
            .orWhere('user.phoneNumber LIKE :searchData')
            .orWhere('user.mailingAddress LIKE :searchData')
            .orWhere('user.entityName LIKE :searchData');
        }),
      );

      query.setParameter('searchData', `%${searchData}%`);
    }

    query.andWhere('user.isActive = :status', { status: true }).limit(20);
    query.orderBy('user.createdAt', 'DESC');

    return query.getMany();
  }

  async getSingleUser(id: Uuid): Promise<UserEntity> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  async getSingleUserSub(sub: string): Promise<UserEntity> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.sub = :sub', { sub });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  //TODO: Change roles are defined in the backend
  async getRoleByUserId(id: string): Promise<unknown> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .select('role.name as name')
      .where('user.id = :id', { id })
      .getRawOne();
  }

  async updateUser(id: Uuid, updateUserDto: UpdateUserDto): Promise<void> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id });

    const userEntity = await queryBuilder.getOne();

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    this.userRepository.merge(userEntity, updateUserDto);

    await this.userRepository.save(userEntity);
  }

  async createAuditLogForbidden(userId: Uuid) {
    await this.commandBus.execute(new CreateAuditLogCommand(userId));

    return {
      message: 'Forbidden',
    };
  }

  acceptCondition(user: UserEntity) {
    void this.userRepository.update(user.id, { acceptedCondition: true });
  }
}
