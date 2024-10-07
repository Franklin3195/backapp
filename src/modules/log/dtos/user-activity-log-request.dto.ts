import { IsNotEmpty } from 'class-validator';

import { DateField, StringField } from '../../../decorators';
export class UserActivityLogRequest {
  @StringField()
  @IsNotEmpty()
  id: Uuid;

  @DateField()
  @IsNotEmpty()
  endDate: Date;
}
