import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';
import type { Repository } from 'typeorm';

import { GeneratorProvider } from '../../../providers';
import { UserEntity } from '../user.entity';
import { GetUserHandler, GetUserQuery } from './get-user.query';

describe('GetUserHandler', () => {
  let getUserHandler: GetUserHandler;
  const mockUserRepository = mock<Repository<UserEntity>>();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetUserHandler,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    getUserHandler = module.get<GetUserHandler>(GetUserHandler);
  });

  describe('execute', () => {
    it('should return a UserEntity when a user with the given ID exists', async () => {
      // Given
      const userId = GeneratorProvider.uuid();
      const query = new GetUserQuery(userId);
      const expectedUserEntity = new UserEntity();
      mockUserRepository.findOneBy.mockResolvedValue(expectedUserEntity);

      // When
      const result = await getUserHandler.execute(query);

      // Then
      expect(result).toBe(expectedUserEntity);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    });

    it('should return null when no user with the given ID exists', async () => {
      // Given
      const userId = GeneratorProvider.uuid();
      const query = new GetUserQuery(userId);
      mockUserRepository.findOneBy.mockResolvedValue(null);

      // When
      const result = await getUserHandler.execute(query);

      // Then
      expect(result).toBeNull();
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    });
  });
});
