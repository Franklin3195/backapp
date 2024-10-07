import { StringFieldOptional } from '../../../decorators';

export class FilterDataDto {
  @StringFieldOptional()
  readonly role?: string;

  @StringFieldOptional()
  readonly searchData?: string;

  @StringFieldOptional()
  readonly archived?: string;
}
