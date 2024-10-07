import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { CreateSurveyAnswerCommand } from './commands/create-survey-answer.command';
import { CreateSurveyAnswerDto } from './dtos/create-survey-answer.dto';
import type { SurveyAnswerDto } from './dtos/survey-answer.dto';
import type { SurveyAnswerPageOptionsDto } from './dtos/survey-answer-page-options.dto';
import type { UpdateSurveyAnswerDto } from './dtos/update-survey-answer.dto';
import { SurveyAnswerNotFoundException } from './exceptions/survey-answer-not-found.exception';
import { GetSurveyAnswerQuery } from './queries/get-survey-answer.query';
import { SurveyAnswerEntity } from './survey-answer.entity';

@Injectable()
export class SurveyAnswerService {
  constructor(
    @InjectRepository(SurveyAnswerEntity)
    private surveyAnswerRepository: Repository<SurveyAnswerEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  createSurveyAnswer(
    createSurveyAnswerDto: CreateSurveyAnswerDto,
  ): Promise<SurveyAnswerEntity> {
    return this.commandBus.execute<
      CreateSurveyAnswerCommand,
      SurveyAnswerEntity
    >(new CreateSurveyAnswerCommand(createSurveyAnswerDto));
  }

  async getAllSurveyAnswer(
    surveyAnswerPageOptionsDto: SurveyAnswerPageOptionsDto,
  ): Promise<PageDto<SurveyAnswerDto>> {
    const queryBuilder =
      this.surveyAnswerRepository.createQueryBuilder('surveyAnswer');
    const [items, pageMetaDto] = await queryBuilder.paginate(
      surveyAnswerPageOptionsDto,
    );

    return items.toPageDto(pageMetaDto);
  }

  async getSingleSurveyAnswer(id: Uuid): Promise<SurveyAnswerEntity> {
    return this.queryBus.execute<GetSurveyAnswerQuery, SurveyAnswerEntity>(
      new GetSurveyAnswerQuery(id),
    );
  }

  async updateSurveyAnswer(
    id: Uuid,
    updateSurveyAnswerDto: UpdateSurveyAnswerDto,
  ): Promise<void> {
    const queryBuilder = this.surveyAnswerRepository
      .createQueryBuilder('surveyAnswer')
      .where('surveyAnswer.id = :id', { id });

    const surveyAnswerEntity = await queryBuilder.getOne();

    if (!surveyAnswerEntity) {
      throw new SurveyAnswerNotFoundException();
    }

    this.surveyAnswerRepository.merge(
      surveyAnswerEntity,
      updateSurveyAnswerDto,
    );

    await this.surveyAnswerRepository.save(surveyAnswerEntity);
  }

  async deleteSurveyAnswer(id: Uuid): Promise<void> {
    const deleteResult = await this.surveyAnswerRepository.softDelete(id);

    if (deleteResult.affected === 0) {
      throw new SurveyAnswerNotFoundException();
    }
  }
}
