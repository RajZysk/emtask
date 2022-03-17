import {MigrationInterface, QueryRunner} from "typeorm";

export class raj1647437027416 implements MigrationInterface {
    name = 'raj1647437027416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state" ("slug" character varying NOT NULL, "isActive" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "state_name" character varying NOT NULL, "countryId" integer, CONSTRAINT "UQ_67cfe181c5e7fc1c4fadd57084c" UNIQUE ("slug"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("slug" character varying NOT NULL, "isActive" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "country_name" character varying NOT NULL, CONSTRAINT "UQ_4cd2b9410fe9cb70466134c2f9a" UNIQUE ("slug"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Teachers" ("slug" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "teacher_name" character varying NOT NULL, CONSTRAINT "UQ_8bb7a4ba618227be74a9f206df3" UNIQUE ("slug"), CONSTRAINT "PK_1ba5491dab0340d3322d3abaf6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Student_Teacher" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "student_id" integer, "teacher_id" integer, CONSTRAINT "PK_868094239a8153ac3401c12a9c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Students" ("slug" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "student_name" character varying NOT NULL, "DOB" TIMESTAMP NOT NULL, CONSTRAINT "UQ_5a6bac69d2b8e8428c9048803e0" UNIQUE ("slug"), CONSTRAINT "PK_40525f6ec1de97950bdc60ff61b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "state" ADD CONSTRAINT "FK_e81c86ceadca8731f5fca8e06f5" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Teacher" ADD CONSTRAINT "FK_c5f3e617181e4686d57068bb2a5" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Teacher" ADD CONSTRAINT "FK_0f4e388b5c58c6b78b1c04586d8" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student_Teacher" DROP CONSTRAINT "FK_0f4e388b5c58c6b78b1c04586d8"`);
        await queryRunner.query(`ALTER TABLE "Student_Teacher" DROP CONSTRAINT "FK_c5f3e617181e4686d57068bb2a5"`);
        await queryRunner.query(`ALTER TABLE "state" DROP CONSTRAINT "FK_e81c86ceadca8731f5fca8e06f5"`);
        await queryRunner.query(`DROP TABLE "Students"`);
        await queryRunner.query(`DROP TABLE "Student_Teacher"`);
        await queryRunner.query(`DROP TABLE "Teachers"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "state"`);
    }

}
