/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { SurveyType } from '../../constants/survey-type';
import { UseDto } from '../../decorators';
import { SurveyAnswerEntity } from '../survey-answer/survey-answer.entity';
import { UserEntity } from '../user/user.entity';
import type { ISurveyDtoOptions } from './dtos/survey.dto';
import { SurveyDto } from './dtos/survey.dto';

@Entity({ name: 'surveys' })
@UseDto(SurveyDto)
export class SurveyEntity extends AbstractEntity<SurveyDto, ISurveyDtoOptions> {
  @Column({
    type: 'enum',
    enum: SurveyType,
    nullable: true,
  })
  type: SurveyType;

  @Column({ type: 'json', nullable: true })
  answers: any;

  @Column({ type: 'text' })
  result: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => SurveyAnswerEntity, (surveyAnswer) => surveyAnswer.type)
  surveyAnswer?: SurveyAnswerEntity[];
}
