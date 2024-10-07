import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateSurveyAnswerDto } from '../dtos/create-survey-answer.dto';
import { SurveyAnswerEntity } from '../survey-answer.entity';

export class CreateSurveyAnswerCommand implements ICommand {
  constructor(public readonly createSurveyAnswerDto: CreateSurveyAnswerDto) {}
}

@CommandHandler(CreateSurveyAnswerCommand)
export class CreateSurveyAnswerHandler
  implements ICommandHandler<CreateSurveyAnswerCommand, SurveyAnswerEntity>
{
  constructor(
    @InjectRepository(SurveyAnswerEntity)
    private surveyAnswerEntityRepository: Repository<SurveyAnswerEntity>,
  ) {}

  async execute(command: CreateSurveyAnswerCommand) {
    const { createSurveyAnswerDto } = command;
    const surveyAnswerEntity = this.surveyAnswerEntityRepository.create(
      createSurveyAnswerDto,
    );

    await this.surveyAnswerEntityRepository.save(surveyAnswerEntity);

    return surveyAnswerEntity;
  }
}
