import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { AnswersCharacterDto } from './character';
import { CreateSurveyBaseDto } from './create-survey-base.dto';

export class CreateSurveyRequestCharacterDto extends CreateSurveyBaseDto {
  @ValidateNested()
  @Type(() => AnswersCharacterDto)
  answers: AnswersCharacterDto;
}
