import { IsString } from 'class-validator';

export class AnswersMoodDto {
  @IsString() question1: string;

  //repeat for all other questions up to question30
  @IsString() question2: string;

  @IsString() question3: string;

  @IsString() question4: string;

  @IsString() question5: string;

  @IsString() question6: string;

  @IsString() question7: string;

  @IsString() question8: string;

  @IsString() question9: string;

  @IsString() question10: string;
}
