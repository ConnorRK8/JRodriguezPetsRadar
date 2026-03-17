import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FoundPet } from "src/core/db/entities/found-pet.entity";
import { IncidentCDto } from "src/core/interfaces/incident.interface";
import { EmailService } from "src/email/email.service";
import { EmailOptions } from "src/core/interfaces/mail-options.interface";
import { generateFoundPetEmailTemplate } from "./templates/found-pet-email.template";

@Injectable()
export class FoundPetsService {
  constructor(
    @InjectRepository(FoundPet)
    private readonly foundPetRepository: Repository<FoundPet>,
    private readonly emailService: EmailService,
  ) {}

  async createFoundPet(incident: IncidentCDto): Promise<{ created: boolean; emailSent: boolean }> {
    const newFoundPet = this.foundPetRepository.create({
      title: incident.title,
      description: incident.description,
      type: incident.type,
      location: {
        type: "Point",
        coordinates: [incident.lon, incident.lat],
      },
    });

    await this.foundPetRepository.save(newFoundPet);

    const template = generateFoundPetEmailTemplate(incident);
    const options: EmailOptions = {
      to: "devjdfr@gmail.com",
      subject: `Mascota encontrada: ${incident.title}`,
      html: template,
    };

    const emailSent = !!await this.emailService.sendEmail(options);
    return { created: true, emailSent };
  }
}

