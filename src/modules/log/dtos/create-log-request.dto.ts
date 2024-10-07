import { LogAction, LogTable } from '../../../constants';
import { StringField } from '../../../decorators';
export class CreateLogRequestDto {
  @StringField({ enum: LogAction })
  event: LogAction;

  @StringField({ enum: LogTable })
  entity: LogTable;
}
