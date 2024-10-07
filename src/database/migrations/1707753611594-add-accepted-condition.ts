import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAcceptedCondition1707753611594 implements MigrationInterface {
  name = 'AddAcceptedCondition1707753611594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`accepted_condition\` tinyint NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`accepted_condition\``,
    );
  }
}
