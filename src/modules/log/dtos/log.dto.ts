import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { LogEntity } from '../log.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ILogDtoOptions {}

export class LogDto extends AbstractDto {
  constructor(entityName: LogEntity, _options?: ILogDtoOptions) {
    super(entityName);
  }
}
