import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { MockProxy } from 'jest-mock-extended';
import { mock } from 'jest-mock-extended';
import type { Repository } from 'typeorm';

import { GeneratorProvider } from '../../providers';
import { CreateRoleCommand } from './commands/create-role.command';
import { CreateRoleDto } from './dtos/create-role.dto';
import type { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleNotFoundException } from './exceptions/role-not-found.exception';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let roleService: RoleService;
  let mockRoleRepository: MockProxy<Repository<RoleEntity>>;
  let mockCommandBus: MockProxy<CommandBus>;
  let mockQueryBus: MockProxy<QueryBus>;

  beforeEach(async () => {
    mockRoleRepository = mock<Repository<RoleEntity>>();
    mockCommandBus = mock<CommandBus>();
    mockQueryBus = mock<QueryBus>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: mockRoleRepository,
        },
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
        {
          provide: QueryBus,
          useValue: mockQueryBus,
        },
      ],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
  });

  describe('createRole', () => {
    it('should execute CreateRoleCommand and return the result', async () => {
      // Given
      const createRoleDto = new CreateRoleDto();
      const createRoleCommand = new CreateRoleCommand(createRoleDto);
      const expectedRoleEntity = new RoleEntity();
      mockCommandBus.execute.mockResolvedValueOnce(expectedRoleEntity);

      // When
      const result = await roleService.createRole(createRoleDto);

      // Then
      expect(result).toBe(expectedRoleEntity);
      expect(mockCommandBus.execute).toHaveBeenCalledWith(createRoleCommand);
    });
  });

  describe('getAllRole', () => {
    it('should return all roles', async () => {
      // Given
      const mockRoleEntities = [new RoleEntity(), new RoleEntity()];
      const mockQueryBuilder = {
        getMany: jest.fn().mockResolvedValueOnce(mockRoleEntities),
      };
      mockRoleRepository.createQueryBuilder.mockReturnValueOnce(
        mockQueryBuilder as never,
      );

      // When
      const result = await roleService.getAllRole();

      // Then
      expect(result).toBe(mockRoleEntities);
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });

    it('should throw RoleNotFoundException when no roles are found', async () => {
      // Given
      const mockQueryBuilder = {
        getMany: jest.fn().mockResolvedValueOnce([]),
      };
      mockRoleRepository.createQueryBuilder.mockReturnValueOnce(
        mockQueryBuilder as never,
      );

      // When & Then
      await expect(roleService.getAllRole()).rejects.toThrow(
        RoleNotFoundException,
      );
      expect(mockQueryBuilder.getMany).toHaveBeenCalled();
    });
  });

  describe('getSingleRole', () => {
    it('should return a single role', async () => {
      // Given
      const mockUuid = GeneratorProvider.uuid();
      const mockRoleEntity = new RoleEntity();
      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(mockRoleEntity),
      };
      mockRoleRepository.createQueryBuilder.mockReturnValueOnce(
        mockQueryBuilder as never,
      );

      // When
      const result = await roleService.getSingleRole(mockUuid);

      // Then
      expect(result).toBe(mockRoleEntity);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('role.id = :id', {
        id: mockUuid,
      });
      expect(mockQueryBuilder.getOne).toHaveBeenCalled();
    });

    it('should throw RoleNotFoundException when no role is found', async () => {
      // Given
      const mockUuid = GeneratorProvider.uuid();
      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(null),
      };
      mockRoleRepository.createQueryBuilder.mockReturnValueOnce(
        mockQueryBuilder as never,
      );

      // When & Then
      await expect(roleService.getSingleRole(mockUuid)).rejects.toThrow(
        RoleNotFoundException,
      );
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('role.id = :id', {
        id: mockUuid,
      });
      expect(mockQueryBuilder.getOne).toHaveBeenCalled();
    });
  });

  describe('updateRole', () => {
    it('should update the role', async () => {
      // Given
      const mockUuid = GeneratorProvider.uuid();
      const mockUpdateRoleDto = {} as UpdateRoleDto;
      const mockRoleEntity = new RoleEntity();
      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(mockRoleEntity),
      };
      mockRoleRepository.createQueryBuilder.mockReturnValueOnce(
        mockQueryBuilder as never,
      );
      mockRoleRepository.save.mockResolvedValueOnce(mockRoleEntity);

      // When
      await roleService.updateRole(mockUuid, mockUpdateRoleDto);

      // Then
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('role.id = :id', {
        id: mockUuid,
      });
      expect(mockQueryBuilder.getOne).toHaveBeenCalled();
      expect(mockRoleRepository.merge).toHaveBeenCalledWith(
        mockRoleEntity,
        mockUpdateRoleDto,
      );
      expect(mockRoleRepository.save).toHaveBeenCalledWith(mockRoleEntity);
    });

    it('should throw RoleNotFoundException when no role is found', async () => {
      // Given
      const mockUuid = GeneratorProvider.uuid();
      const mockUpdateRoleDto = {} as UpdateRoleDto;
      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(null),
      };
      mockRoleRepository.createQueryBuilder.mockReturnValueOnce(
        mockQueryBuilder as never,
      );

      // When & Then
      await expect(
        roleService.updateRole(mockUuid, mockUpdateRoleDto),
      ).rejects.toThrow(RoleNotFoundException);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('role.id = :id', {
        id: mockUuid,
      });
      expect(mockQueryBuilder.getOne).toHaveBeenCalled();
    });
  });

  describe('deleteRole', () => {
    it('should delete the role', async () => {
      // Given
      const mockUuid = GeneratorProvider.uuid();
      const mockDeleteResult = { affected: 1 };
      mockRoleRepository.softDelete.mockResolvedValueOnce(
        mockDeleteResult as never,
      );

      // When
      await roleService.deleteRole(mockUuid);

      // Then
      expect(mockRoleRepository.softDelete).toHaveBeenCalledWith(mockUuid);
    });

    it('should throw RoleNotFoundException when no role is found', async () => {
      // Given
      const mockUuid = GeneratorProvider.uuid();
      const mockDeleteResult = { affected: 0 };
      mockRoleRepository.softDelete.mockResolvedValueOnce(
        mockDeleteResult as never,
      );

      // When & Then
      await expect(roleService.deleteRole(mockUuid)).rejects.toThrow(
        RoleNotFoundException,
      );
      expect(mockRoleRepository.softDelete).toHaveBeenCalledWith(mockUuid);
    });
  });
});
