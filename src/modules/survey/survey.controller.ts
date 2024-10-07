/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SurveyType } from '../../constants/survey-type';
import { Auth, AuthUser } from '../../decorators';
import { UserEntity } from '../user/user.entity';
import { CreateSurveyRequestCharacterDto } from './dtos/surveys/create-survey-request-character.dto';
import { CreateSurveyRequestConflictManagementDto } from './dtos/surveys/create-survey-request-conflict-management.dto';
import { CreateSurveyRequestMoodDto } from './dtos/surveys/create-survey-request-mood.dto';
import { CreateSurveyRequestMood2Dto } from './dtos/surveys/create-survey-request-mood2.dto';
import type { SurveyEntity } from './survey.entity';
import { SurveyService } from './survey.service';

@Controller('surveys')
@ApiTags('surveys')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Post('/conflict-management')
  @ApiOperation({ summary: 'Create a survey' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async conflictManagement(
    @AuthUser() user: UserEntity,
    @Body() survey: CreateSurveyRequestConflictManagementDto,
  ) {
    survey.user = user;

    return this.surveyService.createConflictManagementSurvey(survey);
  }

  @Post('/mood2')
  @ApiOperation({ summary: 'Create a survey' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async mood22(
    @AuthUser() user: UserEntity,
    @Body() survey: CreateSurveyRequestMood2Dto,
  ) {
    survey.user = user;

    return this.surveyService.createMood2Survey(survey);
  }

  @Post('/mood')
  @ApiOperation({ summary: 'Create a survey' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async conflictMood(
    @AuthUser() user: UserEntity,
    @Body() survey: CreateSurveyRequestMoodDto,
  ) {
    survey.user = user;

    return this.surveyService.createMood(survey);
  }

  @Post('/character')
  @ApiOperation({ summary: 'Create a survey' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async character(
    @AuthUser() user: UserEntity,
    @Body() survey: CreateSurveyRequestCharacterDto,
  ) {
    survey.user = user;

    return this.surveyService.createCharacter(survey);
  }

  @Get('conflict-management')
  @ApiOperation({ summary: 'List  surveys conflict-management by user and ' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getConflictManagementSurvey(
    @AuthUser() user: UserEntity,
  ): Promise<SurveyEntity | null> {
    return this.surveyService.getSurveyByUserAndType(
      SurveyType.CONFLICT_MANAGEMENT,
      user.id,
    );
  }

  @Get('character')
  @ApiOperation({ summary: 'List  surveys character by user and ' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getCharacterSurvey(
    @AuthUser() user: UserEntity,
  ): Promise<SurveyEntity | null> {
    return this.surveyService.getSurveyByUserAndType(
      SurveyType.CHARACTER,
      user.id,
    );
  }

  @Get('mood')
  @ApiOperation({ summary: 'List  surveys mood by user and ' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getMoodSurvey(
    @AuthUser() user: UserEntity,
  ): Promise<SurveyEntity | null> {
    return this.surveyService.getSurveyByUserAndType(SurveyType.MOOD, user.id);
  }

  @Get('mood2')
  @ApiOperation({ summary: 'List  surveys mood by user and ' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getMood2Survey(
    @AuthUser() user: UserEntity,
  ): Promise<SurveyEntity | null> {
    return this.surveyService.getSurveyByUserAndType(SurveyType.MOOD2, user.id);
  }
}
