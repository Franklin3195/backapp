/* eslint-disable import/no-unresolved */
import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidatorConstraint } from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomDateValidation implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(date: string, _args: ValidationArguments) {
    return moment(date, 'YYYY-MM-DD', true).isValid();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return 'Date ($value) is invalid!';
  }
}
