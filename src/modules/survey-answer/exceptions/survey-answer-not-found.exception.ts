import { NotFoundException } from '@nestjs/common';

export class SurveyAnswerNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.surveyAnswerNotFound', error);
  }
}
