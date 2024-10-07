import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import compression from 'compression';
import { middleware as expressCtx } from 'express-ctx';
import helmet from 'helmet';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

export async function bootstrap(): Promise<NestExpressApplication> {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true, bufferLogs: true },
  );

  app.use(helmet());
  app.use(compression());
  app.enableVersioning();
  app.useLogger(app.get(Logger));

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new LoggerErrorInterceptor(),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  if (configService.isDevelopment) {
    setupSwagger(app);
  }

  app.use(expressCtx);

  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }

  await app.listen(configService.port);

  console.info(`server running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();
