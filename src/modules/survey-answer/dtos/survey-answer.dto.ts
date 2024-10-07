import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { SurveyAnswerEntity } from '../survey-answer.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISurveyAnswerDtoOptions {}

export class SurveyAnswerDto extends AbstractDto {
  constructor(
    entityName: SurveyAnswerEntity,
    _options?: ISurveyAnswerDtoOptions,
  ) {
    super(entityName);
  }
}
