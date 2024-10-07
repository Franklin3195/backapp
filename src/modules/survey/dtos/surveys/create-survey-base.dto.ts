import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { SurveyType } from '../../../../constants/survey-type';
import { StringField } from '../../../../decorators';
import { UserEntity } from '../../../user/user.entity';

export class CreateSurveyBaseDto {
  @StringField({ enum: SurveyType })
  type: SurveyType;

  @ApiProperty({ example: 'Do not provide' })
  @IsOptional()
  user?: UserEntity;
}
