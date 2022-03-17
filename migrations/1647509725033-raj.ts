import {MigrationInterface, QueryRunner} from "typeorm";

export class raj1647509725033 implements MigrationInterface {
    name = 'raj1647509725033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "state" ("slug" character varying NOT NULL, "isActive" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "state_name" character varying NOT NULL, "country_id" integer, CONSTRAINT "UQ_67cfe181c5e7fc1c4fadd57084c" UNIQUE ("slug"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("slug" character varying NOT NULL, "isActive" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "country_name" character varying NOT NULL, CONSTRAINT "UQ_4cd2b9410fe9cb70466134c2f9a" UNIQUE ("slug"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("slug" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "student_name" character varying NOT NULL, "DOB" character varying NOT NULL, CONSTRAINT "UQ_714c54a719be0ef67f442ed1d80" UNIQUE ("slug"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("slug" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "teacher_name" character varying NOT NULL, CONSTRAINT "UQ_e2541d9d116dd015c27a2765870" UNIQUE ("slug"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Student_Teacher" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "student_id" integer, "teacher_id" integer, CONSTRAINT "PK_868094239a8153ac3401c12a9c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "state" ADD CONSTRAINT "FK_dd19065b0813dbffd8170ea6753" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Teacher" ADD CONSTRAINT "FK_c5f3e617181e4686d57068bb2a5" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student_Teacher" ADD CONSTRAINT "FK_0f4e388b5c58c6b78b1c04586d8" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student_Teacher" DROP CONSTRAINT "FK_0f4e388b5c58c6b78b1c04586d8"`);
        await queryRunner.query(`ALTER TABLE "Student_Teacher" DROP CONSTRAINT "FK_c5f3e617181e4686d57068bb2a5"`);
        await queryRunner.query(`ALTER TABLE "state" DROP CONSTRAINT "FK_dd19065b0813dbffd8170ea6753"`);
        await queryRunner.query(`DROP TABLE "Student_Teacher"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "state"`);
    }

}
