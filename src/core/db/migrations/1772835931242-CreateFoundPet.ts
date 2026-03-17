import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFoundPet1772835931242 implements MigrationInterface {
  name = "CreateFoundPet1772835931242";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "found_pet" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "type" integer NOT NULL, CONSTRAINT "PK_found_pet_id" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "found_pet"`);
  }
}

