/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus, Logger } from '@nestjs/common';

import type { IErrorResponse } from '../interfaces/IErrorResponse';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error('Unexpected error', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: IErrorResponse = {
      statusCode: status,
      message: 'An unexpected error occurred.',
      timestamp: new Date().toISOString(),
      traceId: request.id,
    };

    response.status(status).json(errorResponse);
  }
}
