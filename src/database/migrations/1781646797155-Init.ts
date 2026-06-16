import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1781646797155 implements MigrationInterface {
    name = 'Init1781646797155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "cantidadInicial" integer NOT NULL, "cantidadVerificada" integer, "fechaRegistro" TIMESTAMP NOT NULL DEFAULT now(), "turno" character varying NOT NULL, "estado" character varying NOT NULL DEFAULT 'PENDIENTE', CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "producto"`);
    }

}
