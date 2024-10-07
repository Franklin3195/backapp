/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { IErrorResponse } from 'interfaces/IErrorResponse';

interface IExceptionResponseObject {
  message?: string;
  error?: string;
  [key: string]: any;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus = exception.getStatus();
    const request = ctx.getRequest();

    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST: {
        this.logger.log(exception);
        break;
      }

      case HttpStatus.UNAUTHORIZED: {
        this.logger.warn(exception);
        break;
      }

      case HttpStatus.FORBIDDEN: {
        this.logger.warn(exception);
        break;
      }

      case HttpStatus.NOT_FOUND: {
        this.logger.debug(exception);
        break;
      }

      case HttpStatus.INTERNAL_SERVER_ERROR: {
        this.logger.error(exception);
        break;
      }

      case HttpStatus.SERVICE_UNAVAILABLE: {
        this.logger.fatal(exception);
        break;
      }

      case HttpStatus.GATEWAY_TIMEOUT: {
        this.logger.fatal(exception);
        break;
      }

      default: {
        this.logger.verbose(exception);
        break;
      }
    }

    const exceptionResponse = exception.getResponse();
    let errorMessage: string;
    let errorDescription: string | undefined;

    if (typeof exceptionResponse === 'string') {
      errorMessage = exceptionResponse;
    } else {
      const responseObject = exceptionResponse as IExceptionResponseObject;
      errorMessage = responseObject.message || 'An error occurred';
      errorDescription = responseObject.error;
    }

    const responseBody: IErrorResponse = {
      statusCode: httpStatus,
      message: errorMessage,
      description: errorDescription,
      timestamp: new Date().toISOString(),
      traceId: request.id,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
