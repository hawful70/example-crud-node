import { MigrationInterface, QueryRunner } from "typeorm";

export class JobTable1726929329628 implements MigrationInterface {
    name = 'JobTable1726929329628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "expiry" TIMESTAMP NOT NULL, CONSTRAINT "UQ_00f1309a74e7cc6d028d3f63e85" UNIQUE ("title"), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "jobs"`);
    }

}
