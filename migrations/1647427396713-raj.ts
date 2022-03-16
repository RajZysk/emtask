import {MigrationInterface, QueryRunner} from "typeorm";

export class raj1647427396713 implements MigrationInterface {
    name = 'raj1647427396713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "isActive" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "state_name" character varying NOT NULL, CONSTRAINT "UQ_67cfe181c5e7fc1c4fadd57084c" UNIQUE ("slug"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "isActive" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "country_name" character varying NOT NULL, CONSTRAINT "UQ_4cd2b9410fe9cb70466134c2f9a" UNIQUE ("slug"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country_state" ("state_id" integer NOT NULL, "country_id" integer NOT NULL, CONSTRAINT "PK_c8d0747b9c6ea2b2eb2917f6993" PRIMARY KEY ("state_id", "country_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bcc8855b4cdf7995173603290f" ON "country_state" ("state_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a8c16f743051f854a763f1c83f" ON "country_state" ("country_id") `);
        await queryRunner.query(`ALTER TABLE "country_state" ADD CONSTRAINT "FK_bcc8855b4cdf7995173603290f9" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "country_state" ADD CONSTRAINT "FK_a8c16f743051f854a763f1c83f7" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country_state" DROP CONSTRAINT "FK_a8c16f743051f854a763f1c83f7"`);
        await queryRunner.query(`ALTER TABLE "country_state" DROP CONSTRAINT "FK_bcc8855b4cdf7995173603290f9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a8c16f743051f854a763f1c83f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bcc8855b4cdf7995173603290f"`);
        await queryRunner.query(`DROP TABLE "country_state"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "state"`);
    }

}
