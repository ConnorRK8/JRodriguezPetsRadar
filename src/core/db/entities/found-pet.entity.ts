import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { Point } from "typeorm";
import { IncidentType } from "src/core/enums/incident-type.enum";

@Entity("found_pet")
export class FoundPet {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326,
  })
  location!: Point;

  @Column({ type: "int" })
  type!: IncidentType;
}

