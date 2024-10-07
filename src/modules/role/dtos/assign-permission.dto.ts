import { UUIDField } from '../../../decorators';

export class AssignPermissionDto {
  @UUIDField()
  permissionId: Uuid;
}
