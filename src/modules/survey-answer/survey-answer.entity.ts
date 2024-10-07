import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { SurveyType } from '../../constants/survey-type';
import { UseDto } from '../../decorators';
import type { ISurveyAnswerDtoOptions } from './dtos/survey-answer.dto';
import { SurveyAnswerDto } from './dtos/survey-answer.dto';

@Entity({ name: 'survey-answers' })
@UseDto(SurveyAnswerDto)
export class SurveyAnswerEntity extends AbstractEntity<
  SurveyAnswerDto,
  ISurveyAnswerDtoOptions
> {
  @Column({
    type: 'enum',
    enum: SurveyType,
    nullable: true,
  })
  type: SurveyType;

  @Column()
  category: string;

  @Column({ type: 'text' })
  answer: string;
}
