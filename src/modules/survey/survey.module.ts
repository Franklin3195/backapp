import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateSurveyHandler } from './commands/create-survey.command';
import { GetSurveyHandler } from './queries/get-survey.query';
import { GetSurveyByUserHandler } from './queries/get-survey-by-user.query';
import { SurveyController } from './survey.controller';
import { SurveyEntity } from './survey.entity';
import { SurveyService } from './survey.service';

export const handlers = [
  CreateSurveyHandler,
  GetSurveyHandler,
  GetSurveyByUserHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity])],
  providers: [SurveyService, ...handlers],
  controllers: [SurveyController],
})
export class SurveyModule {}
