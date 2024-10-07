import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SurveyNotFoundException } from '../exceptions/survey-not-found.exception';
import { SurveyEntity } from '../survey.entity';

export class GetSurveyQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetSurveyQuery)
export class GetSurveyHandler implements IQueryHandler<GetSurveyQuery> {
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyEntityRepository: Repository<SurveyEntity>,
  ) {}

  async execute(query: GetSurveyQuery): Promise<SurveyEntity> {
    const surveyEntity = await this.surveyEntityRepository.findOneBy({
      id: query.id,
    });

    if (!surveyEntity) {
      throw new SurveyNotFoundException();
    }

    return surveyEntity;
  }
}
