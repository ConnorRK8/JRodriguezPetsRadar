import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLostPet1772835931241 implements MigrationInterface {
  name = "CreateLostPet1772835931241";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lost_pet" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "type" integer NOT NULL, CONSTRAINT "PK_lost_pet_id" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lost_pet"`);
  }
}

