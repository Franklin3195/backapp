import { NotFoundException } from '@nestjs/common';

export class SurveyNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.surveyNotFound', error);
  }
}
