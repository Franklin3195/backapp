import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import { NumberFieldOptional } from '../../../decorators';

export class RolePageOptionsDto extends PageOptionsDto {
  @NumberFieldOptional()
  limit?: number;
}
