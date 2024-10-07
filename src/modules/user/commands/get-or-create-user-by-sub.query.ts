import type { ICommand, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagementClient } from 'auth0';
import { Repository } from 'typeorm';

import type { IJwtPayload } from '../../../interfaces/IJwtPayload';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserEntity } from '../user.entity';
export class GetOrCreateUserBySubQuery implements ICommand {
  constructor(public readonly payload: IJwtPayload) {}
}

@QueryHandler(GetOrCreateUserBySubQuery)
export class GetOrCreateUserBySubHandler
  implements IQueryHandler<GetOrCreateUserBySubQuery>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ApiConfigService,
  ) {}

  async execute(query: GetOrCreateUserBySubQuery): Promise<UserEntity> {
    const { payload } = query;
    let userEntity = await this.userRepository.findOne({
      where: { sub: payload.sub },
    });

    if (!userEntity) {
      try {
        const authZero = new ManagementClient({
          domain: this.configService.auth0.domain,
          clientId: this.configService.auth0.clientId,
          clientSecret: this.configService.auth0.clientSecret,
        });

        const response = await authZero.users.get({ id: payload.sub });
        const newUser = new UserEntity();

        newUser.sub = payload.sub;
        newUser.email = response.data.email;
        newUser.firstName = '';
        newUser.lastName = '';
        newUser.phoneNumber = '';
        newUser.mailingAddress = '';
        newUser.isActive = true;

        userEntity = await this.userRepository.save(newUser);
      } catch {
        new UserNotFoundException();
      }
    }

    return userEntity as UserEntity;
  }
}
