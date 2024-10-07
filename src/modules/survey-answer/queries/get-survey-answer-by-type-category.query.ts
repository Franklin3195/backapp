import type { IQuery, IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { SurveyType } from '../../../constants/survey-type';
import { SurveyAnswerEntity } from '../survey-answer.entity';

export class GetSurveyByTypeCategoryAnswerQuery implements IQuery {
  constructor(
    public readonly surveyType: SurveyType,
    public readonly result: string,
  ) {}
}

@QueryHandler(GetSurveyByTypeCategoryAnswerQuery)
export class GetSurveyByTypeCategoryAnswerHandler
  implements IQueryHandler<GetSurveyByTypeCategoryAnswerQuery>
{
  constructor(
    @InjectRepository(SurveyAnswerEntity)
    private surveyAnswerEntityRepository: Repository<SurveyAnswerEntity>,
  ) {}

  async execute(query: GetSurveyByTypeCategoryAnswerQuery): Promise<string[]> {
    const { surveyType, result } = query;
    const surveyAnswerEntity = this.surveyAnswerEntityRepository
      .createQueryBuilder('surveyAnswer')
      .where('surveyAnswer.type = :type', {
        type: surveyType,
      })
      .andWhere('surveyAnswer.category   IN (:...category)', {
        category: JSON.parse(result),
      });
    const surveyAnswers = await surveyAnswerEntity.getMany();

    const answers: string[] = [];

    for (const surveyAnswer of surveyAnswers) {
      answers.push(surveyAnswer.answer);
    }

    return answers;
  }
}
