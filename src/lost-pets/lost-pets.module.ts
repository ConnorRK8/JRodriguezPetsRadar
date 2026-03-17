import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailModule } from "src/email/email.module";
import { LostPet } from "src/core/db/entities/lost-pet.entity";
import { LostPetsService } from "./lost-pets.service";
import { LostPetsController } from "./lost-pets.controller";

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([LostPet])],
  providers: [LostPetsService],
  controllers: [LostPetsController],
})
export class LostPetsModule {}

