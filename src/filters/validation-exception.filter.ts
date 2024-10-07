import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import type { IErrorResponse } from './../interfaces/IErrorResponse';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: ValidationError, host: ArgumentsHost) {
    this.logger.warn('Validation error', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = HttpStatus.BAD_REQUEST;

    const errorMessage = this.getErrorMessage(exception);

    const errorResponse: IErrorResponse = {
      statusCode: status,
      message: errorMessage,
      timestamp: new Date().toISOString(),
      traceId: request.id,
    };

    response.status(status).json(errorResponse);
  }

  private getErrorMessage(exception: ValidationError): string {
    if (exception.constraints) {
      const property = exception.property;
      const constraints = Object.values(exception.constraints).join(', ');

      return `Validation error on property "${property}": ${constraints}`;
    }

    if (exception.children && exception.children.length > 0) {
      for (const child of exception.children) {
        const message = this.getErrorMessage(child);

        if (message) {
          return message;
        }
      }
    }

    return 'Unknown validation error';
  }
}
