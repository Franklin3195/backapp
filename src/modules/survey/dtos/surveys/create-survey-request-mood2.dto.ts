import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { CreateSurveyBaseDto } from './create-survey-base.dto';
import { AnswersMood2Dto } from './mood2';

export class CreateSurveyRequestMood2Dto extends CreateSurveyBaseDto {
  @ValidateNested()
  @Type(() => AnswersMood2Dto)
  answers: AnswersMood2Dto;
}
