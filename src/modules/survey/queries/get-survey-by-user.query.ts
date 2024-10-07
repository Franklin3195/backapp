import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SurveyEntity } from '../survey.entity';

export class GetSurveyByUserQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetSurveyByUserQuery)
export class GetSurveyByUserHandler
  implements IQueryHandler<GetSurveyByUserQuery>
{
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyEntityRepository: Repository<SurveyEntity>,
  ) {}

  async execute(query: GetSurveyByUserQuery): Promise<SurveyEntity[]> {
    const surveyEntity = this.surveyEntityRepository
      .createQueryBuilder('survey')
      .where('survey.user_id = :id', { id: query.id });

    return surveyEntity.getMany();
  }
}
