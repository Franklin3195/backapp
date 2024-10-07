import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { SurveyType } from '../../constants/survey-type';
import { GetSurveyByTypeCategoryAnswerQuery } from '../survey-answer/queries/get-survey-answer-by-type-category.query';
import { CreateSurveyCommand } from './commands/create-survey.command';
import { CreateSurveyDto } from './dtos/create-survey.dto';
import type { SurveyDto } from './dtos/survey.dto';
import type { SurveyPageOptionsDto } from './dtos/survey-page-options.dto';
import { CreateSurveyRequestCharacterDto } from './dtos/surveys/create-survey-request-character.dto';
import { CreateSurveyRequestConflictManagementDto } from './dtos/surveys/create-survey-request-conflict-management.dto';
import { CreateSurveyRequestMoodDto } from './dtos/surveys/create-survey-request-mood.dto';
import { CreateSurveyRequestMood2Dto } from './dtos/surveys/create-survey-request-mood2.dto';
import type { UpdateSurveyDto } from './dtos/update-survey.dto';
import { SurveyNotFoundException } from './exceptions/survey-not-found.exception';
import { GetSurveyQuery } from './queries/get-survey.query';
import { SurveyEntity } from './survey.entity';
import { getAnswerCharacter } from './utils/character';
import { getAnswerConflictManagement } from './utils/conflict-management';
import { getAnswerMood } from './utils/mood';
import { getAnswerMood2 } from './utils/mood2';
@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Transactional()
  createSurvey(createSurveyDto: CreateSurveyDto): Promise<SurveyEntity> {
    return this.commandBus.execute<CreateSurveyCommand, SurveyEntity>(
      new CreateSurveyCommand(createSurveyDto),
    );
  }

  async getAllSurvey(
    surveyPageOptionsDto: SurveyPageOptionsDto,
  ): Promise<PageDto<SurveyDto>> {
    const queryBuilder = this.surveyRepository.createQueryBuilder('survey');
    const [items, pageMetaDto] =
      await queryBuilder.paginate(surveyPageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getSingleSurvey(id: Uuid): Promise<SurveyEntity> {
    return this.queryBus.execute<GetSurveyQuery, SurveyEntity>(
      new GetSurveyQuery(id),
    );
  }

  async updateSurvey(
    id: Uuid,
    updateSurveyDto: UpdateSurveyDto,
  ): Promise<void> {
    const queryBuilder = this.surveyRepository
      .createQueryBuilder('survey')
      .where('survey.id = :id', { id });
    const surveyEntity = await queryBuilder.getOne();

    if (!surveyEntity) {
      throw new SurveyNotFoundException();
    }

    this.surveyRepository.merge(surveyEntity, updateSurveyDto);
    await this.surveyRepository.save(surveyEntity);
  }

  @Transactional()
  async createConflictManagementSurvey(
    createSurveyRequestDto: CreateSurveyRequestConflictManagementDto,
  ): Promise<SurveyEntity> {
    const resultAnswer = getAnswerConflictManagement(
      createSurveyRequestDto.answers,
    );
    const answer = await this.queryBus.execute<
      GetSurveyByTypeCategoryAnswerQuery,
      string[]
    >(
      new GetSurveyByTypeCategoryAnswerQuery(
        SurveyType.CONFLICT_MANAGEMENT,
        JSON.stringify(resultAnswer),
      ),
    );
    const result = {
      category: resultAnswer,
      interpretations: answer,
    };
    const createSurveyDto: CreateSurveyDto = {
      ...createSurveyRequestDto,
      result: JSON.stringify(result),
    };

    // return this.commandBus.execute<CreateSurveyCommand, SurveyEntity>(
    //   new CreateSurveyCommand(createSurveyDto),
    // );
    return this.commandBus.execute<CreateSurveyCommand, SurveyEntity>(
      new CreateSurveyCommand(createSurveyDto),
    );
  }

  @Transactional()
  async createMood(
    createSurveyRequestDto: CreateSurveyRequestMoodDto,
  ): Promise<SurveyEntity> {
    const resultAnswer = getAnswerMood(createSurveyRequestDto.answers);
    const answer = await this.queryBus.execute<
      GetSurveyByTypeCategoryAnswerQuery,
      string[]
    >(
      new GetSurveyByTypeCategoryAnswerQuery(
        SurveyType.MOOD,
        JSON.stringify([resultAnswer]),
      ),
    );
    const result = {
      category: resultAnswer,
      interpretations: answer,
    };
    const createSurveyDto: CreateSurveyDto = {
      ...createSurveyRequestDto,
      type: SurveyType.MOOD,
      result: JSON.stringify(result),
    };

    return this.commandBus.execute<CreateSurveyCommand, SurveyEntity>(
      new CreateSurveyCommand(createSurveyDto),
    );
  }

  @Transactional()
  async createMood2Survey(
    createSurveyRequestDto: CreateSurveyRequestMood2Dto,
  ): Promise<SurveyEntity> {
    const resultAnswer = getAnswerMood2(createSurveyRequestDto.answers);
    const createSurveyDto: CreateSurveyDto = {
      ...createSurveyRequestDto,
      type: SurveyType.MOOD2,
      result: JSON.stringify(resultAnswer),
    };
    const surveyResult = await this.commandBus.execute<
      CreateSurveyCommand,
      SurveyEntity
    >(new CreateSurveyCommand(createSurveyDto));

    if (createSurveyRequestDto.user) {
      void this.queryBus.execute(createSurveyRequestDto.user);
    }

    return surveyResult;
  }

  @Transactional()
  async createCharacter(
    createSurveyRequestDto: CreateSurveyRequestCharacterDto,
  ): Promise<SurveyEntity> {
    const resultAnswer = getAnswerCharacter(createSurveyRequestDto.answers);
    const answer = await this.queryBus.execute<
      GetSurveyByTypeCategoryAnswerQuery,
      string[]
    >(
      new GetSurveyByTypeCategoryAnswerQuery(
        SurveyType.CHARACTER,
        JSON.stringify(resultAnswer),
      ),
    );
    const result = {
      category: resultAnswer,
      interpretations: answer,
    };
    const createSurveyDto: CreateSurveyDto = {
      ...createSurveyRequestDto,
      type: SurveyType.CHARACTER,
      result: JSON.stringify(result),
    };

    return this.commandBus.execute<CreateSurveyCommand, SurveyEntity>(
      new CreateSurveyCommand(createSurveyDto),
    );
  }

  async getSurveyByUserAndType(
    type: SurveyType,
    userId: Uuid,
  ): Promise<SurveyEntity | null> {
    const queryBuilder = this.surveyRepository
      .createQueryBuilder('survey')
      .where('survey.type = :type', { type })
      .andWhere('survey.user_id = :userId', { userId });

    return queryBuilder.getOne();
  }
}
