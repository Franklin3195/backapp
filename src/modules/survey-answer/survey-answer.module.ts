import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateSurveyAnswerHandler } from './commands/create-survey-answer.command';
import { GetSurveyAnswerHandler } from './queries/get-survey-answer.query';
import { GetSurveyByTypeCategoryAnswerHandler } from './queries/get-survey-answer-by-type-category.query';
import { SurveyAnswerController } from './survey-answer.controller';
import { SurveyAnswerEntity } from './survey-answer.entity';
import { SurveyAnswerService } from './survey-answer.service';

export const handlers = [
  CreateSurveyAnswerHandler,
  GetSurveyAnswerHandler,
  GetSurveyByTypeCategoryAnswerHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([SurveyAnswerEntity])],
  providers: [SurveyAnswerService, ...handlers],
  controllers: [SurveyAnswerController],
})
export class SurveyAnswerModule {}
