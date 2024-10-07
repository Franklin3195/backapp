import { IsOptional } from 'class-validator';

import { LogAction, LogTable } from '../../../constants';
import { StringField } from '../../../decorators';
export class CreateLogDto {
  @StringField({ enum: LogAction })
  event: LogAction;

  @StringField({ enum: LogTable })
  entity: LogTable;

  @StringField()
  @IsOptional()
  ipAddress: string;

  @StringField()
  @IsOptional()
  user: {
    id: Uuid;
  };
}
