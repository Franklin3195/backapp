import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { extractDataFromMessage } from '../utils/extract-data-from-message';
import type { IErrorResponse } from './../interfaces/IErrorResponse';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter
  implements ExceptionFilter<QueryFailedError>
{
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    this.logger.error(`Database Error: ${exception.message}`, exception.stack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: HttpStatus;
    let errorMessage: string;

    switch (true) {
      case exception.message.includes('Duplicate entry'): {
        status = HttpStatus.CONFLICT;
        errorMessage = `The provided data already exists in the system, ${extractDataFromMessage(
          exception.message,
        )}`;
        break;
      }

      case exception.message.includes('foreign key constraint'): {
        status = HttpStatus.BAD_REQUEST;
        errorMessage = 'The operation violates a foreign key constraint.';
        break;
      }

      case exception.message.includes('violates not-null constraint'): {
        status = HttpStatus.BAD_REQUEST;
        errorMessage = 'A required field is missing or set to null.';
        break;
      }

      case exception.message.includes('Data too long'): {
        status = HttpStatus.BAD_REQUEST;
        errorMessage = 'Provided data is too long.';
        break;
      }

      case exception.message.includes('invalid input syntax'): {
        status = HttpStatus.BAD_REQUEST;
        errorMessage = 'Invalid data format or type provided.';
        break;
      }

      default: {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = 'An unexpected database error occurred.';
        break;
      }
    }

    const errorResponse: IErrorResponse = {
      statusCode: status,
      message: errorMessage,
      timestamp: new Date().toISOString(),
      traceId: request.id,
    };

    response.status(status).json(errorResponse);
  }
}
