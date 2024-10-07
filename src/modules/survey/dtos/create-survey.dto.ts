/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';

import { SurveyType } from '../../../constants/survey-type';
import { StringField, StringFieldOptional } from '../../../decorators';
import { UserEntity } from '../../user/user.entity';

export class CreateSurveyDto {
  @StringField({ enum: SurveyType })
  type: SurveyType;

  @ValidateNested()
  answers: any;

  @StringFieldOptional()
  result: string;

  @ApiProperty({ example: 'Do not provide' })
  @IsOptional()
  user?: UserEntity;
}
