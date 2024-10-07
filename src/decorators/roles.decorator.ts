import { SetMetadata } from '@nestjs/common';

import type { RoleType } from './../constants/role-type';

export const ROLES_KEY = 'roles';

export function Roles(...roles: RoleType[]) {
  return SetMetadata(ROLES_KEY, roles);
}
