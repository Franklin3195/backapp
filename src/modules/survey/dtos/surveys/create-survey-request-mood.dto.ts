import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { CreateSurveyBaseDto } from './create-survey-base.dto';
import { AnswersMoodDto } from './mood';

export class CreateSurveyRequestMoodDto extends CreateSurveyBaseDto {
  @ValidateNested()
  @Type(() => AnswersMoodDto)
  answers: AnswersMoodDto;
}
