import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { AnswersConflictManagementDto } from './conflict-management';
import { CreateSurveyBaseDto } from './create-survey-base.dto';

export class CreateSurveyRequestConflictManagementDto extends CreateSurveyBaseDto {
  @ValidateNested()
  @Type(() => AnswersConflictManagementDto)
  answers: AnswersConflictManagementDto;
}
