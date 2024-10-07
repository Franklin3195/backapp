/* eslint-disable no-await-in-loop */
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { ApiConfigService } from './api-config.service';

@Injectable()
export class TestService {
  constructor(
    private connection: Connection,
    private apiConfigService: ApiConfigService,
  ) {}

  public async cleanDatabase(): Promise<void> {
    if (!this.apiConfigService.isLocalTest) {
      return;
    }

    try {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=0;');

      const tableNames = ['users'];

      for (const tableName of tableNames) {
        await this.connection.query(`TRUNCATE TABLE \`${tableName}\`;`);
      }

      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');
    } catch (error) {
      await this.connection.query('SET FOREIGN_KEY_CHECKS=1;');

      throw new Error(`ERROR: Cleaning test database: ${error}`);
    }
  }
}
