import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SurveyAnswerNotFoundException } from '../exceptions/survey-answer-not-found.exception';
import { SurveyAnswerEntity } from '../survey-answer.entity';

export class GetSurveyAnswerQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetSurveyAnswerQuery)
export class GetSurveyAnswerHandler
  implements IQueryHandler<GetSurveyAnswerQuery>
{
  constructor(
    @InjectRepository(SurveyAnswerEntity)
    private surveyAnswerEntityRepository: Repository<SurveyAnswerEntity>,
  ) {}

  async execute(query: GetSurveyAnswerQuery): Promise<SurveyAnswerEntity> {
    const surveyAnswerEntity =
      await this.surveyAnswerEntityRepository.findOneBy({ id: query.id });

    if (!surveyAnswerEntity) {
      throw new SurveyAnswerNotFoundException();
    }

    return surveyAnswerEntity;
  }
}
