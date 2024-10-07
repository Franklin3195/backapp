import { SetMetadata } from '@nestjs/common';

import type { PermissionType } from './../constants/permission-type';

export const PERMISSIONS_KEY = 'permissions';

export function Permissions(...permissions: PermissionType[]) {
  return SetMetadata(PERMISSIONS_KEY, permissions);
}
