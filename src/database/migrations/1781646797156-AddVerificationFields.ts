import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerificationFields1781646797156
  implements MigrationInterface
{
  name = 'AddVerificationFields1781646797156';

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producto" ADD "fechaVerificacion" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "producto" ADD "turnoVerificacion" character varying`,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producto" DROP COLUMN "turnoVerificacion"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producto" DROP COLUMN "fechaVerificacion"`,
    );
  }
}
