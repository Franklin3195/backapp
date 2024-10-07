import { faker } from '@faker-js/faker';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import type { Repository } from 'typeorm';

import { RoleType } from '../../../constants';
import { RoleEntity } from '../role.entity';
import { GetRoleHandler, GetRoleQuery } from './get-role.query';

describe('GetRoleHandler', () => {
  let getRoleHandler: GetRoleHandler;
  const mockRoleRepository = mock<Repository<RoleEntity>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRoleHandler,
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    getRoleHandler = module.get<GetRoleHandler>(GetRoleHandler);
  });

  describe('execute', () => {
    it('should query the role repository with the correct role name and return the result', async () => {
      // Given
      const roleName = faker.helpers.enumValue(RoleType);
      const query = new GetRoleQuery(roleName);
      const mockRoleEntity = new RoleEntity();
      mockRoleEntity.name = roleName;

      mockRoleRepository.findOne.mockResolvedValueOnce(mockRoleEntity);

      // When
      const result = await getRoleHandler.execute(query);

      // Then
      expect(result).toBe(mockRoleEntity);
      expect(mockRoleRepository.findOne).toHaveBeenCalledWith({
        where: { name: roleName },
      });
    });
  });
});
