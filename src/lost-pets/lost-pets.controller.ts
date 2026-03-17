import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { LostPetsService } from "./lost-pets.service";
import type { IncidentCDto } from "src/core/interfaces/incident.interface";

@Controller("lost_pets")
export class LostPetsController {
  constructor(private readonly lostPetsService: LostPetsService) {}

  @Get()
  info() {
    return {
      message: "Use POST to create a lost pet report",
      body: { title: "string", description: "string", lat: "number", lon: "number", type: "IncidentType (1-23)" },
    };
  }

  @Post()
  async createLostPet(@Body() incident: IncidentCDto) {
    const { title, description, lat, lon, type } = incident ?? {};
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof lat !== "number" ||
      typeof lon !== "number" ||
      typeof type !== "number"
    ) {
      throw new BadRequestException(
        'Body must be: { "title": "string", "description": "string", "lat": number, "lon": number, "type": number (1-23) }',
      );
    }
    const { created, emailSent } = await this.lostPetsService.createLostPet(incident);
    return { created, emailSent };
  }
}

