import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { RoleType } from './../constants/role-type';
import type { UserEntity } from './../modules/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());

    if (roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const dbUser: UserEntity = request.user;

    const hasRole = () => roles.includes(dbUser.role.name as RoleType);

    return hasRole();
  }
}
