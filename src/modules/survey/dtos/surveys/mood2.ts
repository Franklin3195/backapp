import { IsNumber } from 'class-validator';

export class AnswersMood2Dto {
  @IsNumber() question1: number;

  //repeat for all other questions up to question30
  @IsNumber() question2: number;

  @IsNumber() question3: number;

  @IsNumber() question4: number;

  @IsNumber() question5: number;

  @IsNumber() question6: number;

  @IsNumber() question7: number;

  @IsNumber() question8: number;

  @IsNumber() question9: number;

  @IsNumber() question10: number;

  @IsNumber() question11: number;

  @IsNumber() question12: number;

  @IsNumber() question13: number;

  @IsNumber() question14: number;

  @IsNumber() question15: number;

  @IsNumber() question16: number;
}
