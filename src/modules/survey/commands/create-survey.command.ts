import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateSurveyDto } from '../dtos/create-survey.dto';
import { SurveyEntity } from '../survey.entity';

export class CreateSurveyCommand implements ICommand {
  constructor(public readonly createSurveyDto: CreateSurveyDto) {}
}

@CommandHandler(CreateSurveyCommand)
export class CreateSurveyHandler
  implements ICommandHandler<CreateSurveyCommand, SurveyEntity>
{
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyEntityRepository: Repository<SurveyEntity>,
  ) {}

  async execute(command: CreateSurveyCommand) {
    const { createSurveyDto } = command;
    // const exitsSurvey = await this.surveyEntityRepository
    //   .createQueryBuilder('survey')
    //   .where('survey.type = :type', { type: createSurveyDto.type })
    //   .andWhere('survey.user_id = :userId', {
    //     userId: createSurveyDto.user?.id,
    //   })
    //   .getOne();

    // if (exitsSurvey) {
    //   return exitsSurvey;
    // }

    const surveyEntity = this.surveyEntityRepository.create(createSurveyDto);

    await this.surveyEntityRepository.save(surveyEntity);

    return surveyEntity;
  }
}
