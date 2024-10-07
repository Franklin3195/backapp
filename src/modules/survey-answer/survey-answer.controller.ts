import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth } from '../../decorators';
import { CreateSurveyAnswerDto } from './dtos/create-survey-answer.dto';
import { SurveyAnswerService } from './survey-answer.service';

@Controller('survey-answers')
@ApiTags('survey-answers')
export class SurveyAnswerController {
  constructor(private surveyAnswerService: SurveyAnswerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a survey-answer' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createSurveyAnswer(
    @Body() createSurveyAnswerDto: CreateSurveyAnswerDto,
  ) {
    const entity = await this.surveyAnswerService.createSurveyAnswer(
      createSurveyAnswerDto,
    );

    return entity.toDto();
  }
}
