import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { CreateRoleCommand } from './commands/create-role.command';
import { CreateRoleDto } from './dtos/create-role.dto';
import type { RoleDto } from './dtos/role.dto';
import type { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleNotFoundException } from './exceptions/role-not-found.exception';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.commandBus.execute<CreateRoleCommand, RoleEntity>(
      new CreateRoleCommand(createRoleDto),
    );
  }

  async getAllRole(): Promise<RoleDto[]> {
    const queryBuilder = this.roleRepository.createQueryBuilder('role');

    const roleEntity = await queryBuilder.getMany();

    if (roleEntity.length === 0) {
      throw new RoleNotFoundException();
    }

    return roleEntity;
  }

  async getSingleRole(id: Uuid): Promise<RoleEntity> {
    const queryBuilder = this.roleRepository
      .createQueryBuilder('role')
      .where('role.id = :id', { id });

    const roleEntity = await queryBuilder.getOne();

    if (!roleEntity) {
      throw new RoleNotFoundException();
    }

    return roleEntity;
  }

  async updateRole(id: Uuid, updateRoleDto: UpdateRoleDto): Promise<void> {
    const queryBuilder = this.roleRepository
      .createQueryBuilder('role')
      .where('role.id = :id', { id });

    const roleEntity = await queryBuilder.getOne();

    if (!roleEntity) {
      throw new RoleNotFoundException();
    }

    this.roleRepository.merge(roleEntity, updateRoleDto);

    await this.roleRepository.save(roleEntity);
  }

  async deleteRole(id: Uuid): Promise<void> {
    const deleteResult = await this.roleRepository.softDelete(id);

    if (deleteResult.affected === 0) {
      throw new RoleNotFoundException();
    }
  }

  /*   @Transactional()
  async assignPermissionToRole(
    roleId: Uuid,
    permissionId: Uuid,
  ): Promise<void> {
    const roleEntity = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!roleEntity) {
      throw new RoleNotFoundException();
    }

    const permissionEntity = await this.queryBus.execute<
      GetPermissionQuery,
      PermissionEntity
    >(new GetPermissionQuery(permissionId));

    // Verify if the role has the permission
/*     if (
      !roleEntity.permissions.some(
        (permission) => permission.id === permissionId,
      )
    ) {
      roleEntity.permissions.push(permissionEntity);
      await this.roleRepository.save(roleEntity);
    }
  } */
}
