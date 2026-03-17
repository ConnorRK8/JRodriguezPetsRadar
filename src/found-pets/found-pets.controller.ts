import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { FoundPetsService } from "./found-pets.service";
import type { IncidentCDto } from "src/core/interfaces/incident.interface";

@Controller("found_pets")
export class FoundPetsController {
  constructor(private readonly foundPetsService: FoundPetsService) {}

  @Get()
  info() {
    return {
      message: "Use POST to create a found pet report",
      body: { title: "string", description: "string", lat: "number", lon: "number", type: "IncidentType (1-23)" },
    };
  }

  @Post()
  async createFoundPet(@Body() incident: IncidentCDto) {
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
    const { created, emailSent } = await this.foundPetsService.createFoundPet(incident);
    return { created, emailSent };
  }
}

