/* eslint-disable @typescript-eslint/require-await */
import './boilerplate.polyfill';

import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { ValidationError } from 'class-validator';
import type { IncomingMessage, ServerResponse } from 'http';
import { LoggerModule } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { BlameableNumberSubscriber } from './entity-subscribers/blameable-number.subscriber';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { DatabaseExceptionFilter } from './filters/database-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { LogModule } from './modules/log/log.module';
import { MailModule } from './modules/mail/mail.module';
import { ProfileModule } from './modules/profile/profile.module';
import { RoleModule } from './modules/role/role.module';
import { SurveyModule } from './modules/survey/survey.module';
import { SurveyAnswerModule } from './modules/survey-answer/survey-answer.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { ZipModule } from './modules/zip/zip.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { GeneratorService } from './shared/services/generator.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    // Core and configuration modules
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.MySqlConfig,
      inject: [ApiConfigService],
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    LoggerModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService, GeneratorService],
      useFactory: async (
        configService: ApiConfigService,
        generatorService: GeneratorService,
      ) => ({
        pinoHttp: {
          genReqId: () => generatorService.uuid(),
          serializers: {
            req(request: IncomingMessage) {
              return {
                method: request.method,
                url: request.url,
                id: request.id,
              };
            },
            res(reply: ServerResponse) {
              return {
                statusCode: reply.statusCode,
              };
            },
          },
          autoLogging: true,
          customProps: () => ({
            context: 'HTTP',
          }),
          transport: configService.isProduction
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                },
              },
        },
      }),
      providers: undefined,
    }),
    SharedModule,
    LogModule,
    HealthCheckerModule,

    // Auth and user-related modules
    AuthModule,
    RoleModule,
    UserModule,
    SurveyModule,
    FileModule,
    MailModule,
    ProfileModule,
    SurveyAnswerModule,
    ZipModule,
    UploadModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: DatabaseExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          whitelist: true,
          exceptionFactory: (errors: ValidationError[]) => errors[0],
        }),
    },
    BlameableNumberSubscriber,
  ],
})
export class AppModule {}
