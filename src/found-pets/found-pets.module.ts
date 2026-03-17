import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailModule } from "src/email/email.module";
import { FoundPet } from "src/core/db/entities/found-pet.entity";
import { FoundPetsService } from "./found-pets.service";
import { FoundPetsController } from "./found-pets.controller";

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([FoundPet])],
  providers: [FoundPetsService],
  controllers: [FoundPetsController],
})
export class FoundPetsModule {}

