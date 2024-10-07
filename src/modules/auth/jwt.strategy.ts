import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { IJwtPayload } from '../../interfaces/IJwtPayload';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { GetOrCreateUserBySubQuery } from '../user/commands/get-or-create-user-by-sub.query';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ApiConfigService,
    private queryBus: QueryBus,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: IJwtPayload) {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.queryBus.execute(
      new GetOrCreateUserBySubQuery(payload),
    );

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
