/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { SurveyType } from '../../../constants/survey-type';
import { SurveyAnswerDto } from '../../survey-answer/dtos/survey-answer.dto';
import type { SurveyEntity } from '../survey.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISurveyDtoOptions {}

export class SurveyDto extends AbstractDto {
  @ApiProperty({ enum: SurveyType })
  type: SurveyType;

  @ApiProperty({ required: false })
  answers: any;

  @ApiProperty({ required: false })
  result: string;

  @ApiProperty({ type: () => [SurveyAnswerDto], required: false })
  surveyAnswer?: SurveyAnswerDto[];

  constructor(survey: SurveyEntity, _options?: ISurveyDtoOptions) {
    super(survey);

    this.type = survey.type;

    this.surveyAnswer = survey.surveyAnswer
      ? survey.surveyAnswer.map((p) => new SurveyAnswerDto(p))
      : undefined;
  }
}
