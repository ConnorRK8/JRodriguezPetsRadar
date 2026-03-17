import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LostPet } from "src/core/db/entities/lost-pet.entity";
import { IncidentCDto } from "src/core/interfaces/incident.interface";
import { EmailService } from "src/email/email.service";
import { EmailOptions } from "src/core/interfaces/mail-options.interface";
import { generateLostPetEmailTemplate } from "./templates/lost-pet-email.template";

@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepository: Repository<LostPet>,
    private readonly emailService: EmailService,
  ) {}

  async createLostPet(incident: IncidentCDto): Promise<{ created: boolean; emailSent: boolean }> {
    const newLostPet = this.lostPetRepository.create({
      title: incident.title,
      description: incident.description,
      type: incident.type,
      location: {
        type: "Point",
        coordinates: [incident.lon, incident.lat],
      },
    });

    await this.lostPetRepository.save(newLostPet);

    const template = generateLostPetEmailTemplate(incident);
    const options: EmailOptions = {
      to: "devjdfr@gmail.com",
      subject: `Mascota perdida: ${incident.title}`,
      html: template,
    };

    const emailSent = !!await this.emailService.sendEmail(options);
    return { created: true, emailSent };
  }
}

