/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1705006592022 implements MigrationInterface {
  name = 'Initial1705006592022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`sub\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`mailing_address\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL, \`role_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`profiles\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`profile\` json NULL, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`REL_9e432b7df0d182f8d292902d1a\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`logs\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`ip_address\` varchar(255) NOT NULL, \`entity\` enum ('user') NOT NULL, \`event\` enum ('user:login', 'user:logout') NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`audit-logs\` (\`id\` varchar(36) NOT NULL, \`action\` varchar(255) NOT NULL, \`entity_id\` varchar(255) NOT NULL, \`entity_name\` varchar(255) NOT NULL, \`changes\` json NULL, \`user_id\` varchar(255) NULL, \`timestamp\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`survey-answers\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`type\` enum ('CONFLICT_MANAGEMENT', 'MOOD2', 'CHARACTER', 'MOOD') NULL, \`category\` varchar(255) NOT NULL, \`answer\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`surveys\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`type\` enum ('CONFLICT_MANAGEMENT', 'MOOD2', 'CHARACTER', 'MOOD') NULL, \`answers\` json NULL, \`result\` text NOT NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`assistants\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`assistant_id\` varchar(255) NOT NULL, \`instructions\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`chatais\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`message\` varchar(255) NOT NULL, \`response\` json NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`prompts\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`message\` text NOT NULL, \`user_id\` varchar(36) NULL, \`chat_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`threads\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`thread_id\` varchar(255) NOT NULL, \`created_at_openai\` int NOT NULL, \`prompt_id\` varchar(36) NULL, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_f9fb843269644618778b27d45d\` (\`thread_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`thread-runs\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`run_id\` varchar(255) NOT NULL, \`object\` varchar(255) NOT NULL, \`created_at_openai\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`started_at\` int NULL, \`expires_at\` int NOT NULL, \`failed_at\` int NULL, \`cancelled_at\` int NULL, \`completed_at\` int NULL, \`last_error\` varchar(255) NULL, \`model\` varchar(255) NOT NULL, \`instructions\` text NULL, \`tools\` json NULL, \`file_ids\` json NULL, \`metadata\` json NULL, \`assistant_id\` varchar(36) NULL, \`thread_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`thread-messages\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`deleted_at\` timestamp(6) NULL, \`message_id\` varchar(255) NOT NULL, \`object\` varchar(255) NOT NULL, \`created_at_openai\` int NOT NULL, \`role\` varchar(255) NOT NULL, \`content\` json NOT NULL, \`file_ids\` text NOT NULL, \`assistant_id\` varchar(255) NOT NULL, \`run_id\` varchar(255) NOT NULL, \`metadata\` json NULL, \`thread_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_9e432b7df0d182f8d292902d1a2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`logs\` ADD CONSTRAINT \`FK_70c2c3d40d9f661ac502de51349\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`surveys\` ADD CONSTRAINT \`FK_3e312e00b31402a7e6093db119a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`chatais\` ADD CONSTRAINT \`FK_351f15ad560f9fad0c6e007e52e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prompts\` ADD CONSTRAINT \`FK_aa88f45bd24d019088a898cf66b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`prompts\` ADD CONSTRAINT \`FK_878cf747945519feeccccb6e95a\` FOREIGN KEY (\`chat_id\`) REFERENCES \`chatais\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD CONSTRAINT \`FK_d6894ec3f58e74ed59195a605ba\` FOREIGN KEY (\`prompt_id\`) REFERENCES \`prompts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD CONSTRAINT \`FK_a6cc1a07ec07e376947ed1016a0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`thread-runs\` ADD CONSTRAINT \`FK_d214b5f92064fc9acf78263c871\` FOREIGN KEY (\`assistant_id\`) REFERENCES \`assistants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`thread-runs\` ADD CONSTRAINT \`FK_acd365703395424b21b7b45eddc\` FOREIGN KEY (\`thread_id\`) REFERENCES \`threads\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`thread-messages\` ADD CONSTRAINT \`FK_234bac15d530f6c4bd27e2cc63b\` FOREIGN KEY (\`thread_id\`) REFERENCES \`threads\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`thread-messages\` DROP FOREIGN KEY \`FK_234bac15d530f6c4bd27e2cc63b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`thread-runs\` DROP FOREIGN KEY \`FK_acd365703395424b21b7b45eddc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`thread-runs\` DROP FOREIGN KEY \`FK_d214b5f92064fc9acf78263c871\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` DROP FOREIGN KEY \`FK_a6cc1a07ec07e376947ed1016a0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` DROP FOREIGN KEY \`FK_d6894ec3f58e74ed59195a605ba\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prompts\` DROP FOREIGN KEY \`FK_878cf747945519feeccccb6e95a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`prompts\` DROP FOREIGN KEY \`FK_aa88f45bd24d019088a898cf66b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`chatais\` DROP FOREIGN KEY \`FK_351f15ad560f9fad0c6e007e52e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`surveys\` DROP FOREIGN KEY \`FK_3e312e00b31402a7e6093db119a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`logs\` DROP FOREIGN KEY \`FK_70c2c3d40d9f661ac502de51349\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_9e432b7df0d182f8d292902d1a2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``,
    );
    await queryRunner.query(`DROP TABLE \`thread-messages\``);
    await queryRunner.query(`DROP TABLE \`thread-runs\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f9fb843269644618778b27d45d\` ON \`threads\``,
    );
    await queryRunner.query(`DROP TABLE \`threads\``);
    await queryRunner.query(`DROP TABLE \`prompts\``);
    await queryRunner.query(`DROP TABLE \`chatais\``);
    await queryRunner.query(`DROP TABLE \`assistants\``);
    await queryRunner.query(`DROP TABLE \`surveys\``);
    await queryRunner.query(`DROP TABLE \`survey-answers\``);
    await queryRunner.query(`DROP TABLE \`audit-logs\``);
    await queryRunner.query(`DROP TABLE \`logs\``);
    await queryRunner.query(
      `DROP INDEX \`REL_9e432b7df0d182f8d292902d1a\` ON \`profiles\``,
    );
    await queryRunner.query(`DROP TABLE \`profiles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``,
    );
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
