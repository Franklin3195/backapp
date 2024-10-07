import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import type { SeederOptions } from 'typeorm-extension';

import { SnakeNamingStrategy } from '../../snake-naming.strategy';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get appLaunchBaseUrl(): string {
    if (this.isLocalTest) {
      return 'https://app.dev.appyudame.com/';
    }

    if (this.isDevelopment) {
      return 'https://app.dev.appyudame.com/';
    }

    if (this.isTest) {
      return 'https://app.test.appyudame.com/';
    }

    if (this.isProduction) {
      return 'https://app.appyudame.com/';
    }

    throw new Error('Unsupported environment');
  }

  get apiLaunchBaseUrl(): string {
    if (this.isLocalTest) {
      return 'api.dev.appyudame.com/';
    }

    if (this.isDevelopment) {
      return 'api.dev.appyudame.com/';
    }

    if (this.isTest) {
      return 'api.test.appyudame.com/';
    }

    if (this.isProduction) {
      return 'api.appyudame.com/';
    }

    throw new Error('Unsupported environment');
  }

  get isLocalTest(): boolean {
    return this.nodeEnv === 'local_test';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'dev';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'prod';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  get port(): number {
    return this.getNumber('PORT');
  }

  get awsRegion(): string {
    return this.getString('AWS_REGION');
  }

  get awsAccessKeyId(): string {
    return this.getString('AWS_ACCESS_KEY_ID');
  }

  get awsSecretAccessKey(): string {
    return this.getString('AWS_SECRET_ACCESS_KEY');
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  get nodeEnv(): string {
    return this.getString('PARAMS_ENV');
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE');
  }

  get MySqlConfig(): TypeOrmModuleOptions & SeederOptions {
    let entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];
    let migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];
    let seeds = [__dirname + '/../../database/seeds/*{.ts,.js}'];

    if (module.hot) {
      const entityContext = require.context(
        './../../modules',
        true,
        /\.entity\.ts$/,
      );
      entities = entityContext.keys().map((id) => {
        const entityModule = entityContext<Record<string, unknown>>(id);
        const [entity] = Object.values(entityModule);

        return entity as string;
      });
      const migrationContext = require.context(
        './../../database/migrations',
        false,
        /\.ts$/,
      );

      migrations = migrationContext.keys().map((id) => {
        const migrationModule = migrationContext<Record<string, unknown>>(id);
        const [migration] = Object.values(migrationModule);

        return migration as string;
      });

      const seedContext = require.context(
        './../../database/seeds',
        false,
        /\.ts$/,
      );

      seeds = seedContext.keys().map((id) => {
        const seedModule = seedContext<Record<string, unknown>>(id);
        const [seed] = Object.values(seedModule);

        return seed as string;
      });
    }

    if (this.isLocalTest) {
      return {
        type: 'mysql',
        host: this.getString('TEST_DB_HOST'),
        port: this.getNumber('TEST_DB_PORT'),
        username: this.getString('TEST_DB_USERNAME'),
        password: this.getString('TEST_DB_PASSWORD'),
        database: this.getString('TEST_DB_DATABASE'),
        entities,
        migrations,
        seeds,
        synchronize: true,
        migrationsRun: true,
        dropSchema: true,
        logging: false,
        namingStrategy: new SnakeNamingStrategy(),
      };
    }

    return {
      seeds,
      entities,
      migrations,
      type: 'mysql',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      migrationsRun: this.isDevelopment,
      logging: this.isDevelopment,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get awsS3Config() {
    return {
      bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
      bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
      bucketName: this.getString('AWS_S3_BUCKET_NAME'),
    };
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get natsEnabled(): boolean {
    return this.getBoolean('NATS_ENABLED');
  }

  get natsConfig() {
    return {
      host: this.getString('NATS_HOST'),
      port: this.getNumber('NATS_PORT'),
    };
  }

  get twilioConfig() {
    return {
      accountSid: this.getString('TWILIO_ACCOUNT_SID'),
      authToken: this.getString('TWILIO_AUTH_TOKEN'),
      phoneNumber: this.getString('TWILIO_PHONE_NUMBER'),
    };
  }

  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
    };
  }

  get auth0() {
    return {
      audience: this.getString('AUTH0_AUDIENCE') || '',
      domain: this.getString('AUTH0_DOMAIN') || '',
      clientId: this.getString('AUTH0_CLIENT_ID') || '',
      callbackUrl: this.getString('AUTH0_CALLBACK_URL') || '',
      clientSecret: this.getString('AUTH0_CLIENT_SECRET') || '',
      issuerUrl: this.getString('AUTH0_ISSUER_URL') || '',
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
