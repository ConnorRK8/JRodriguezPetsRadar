import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import type { IncidentCDto } from 'src/core/interfaces/incident.interface';

@Controller('incidents')
export class IncidentsController {

    constructor(private readonly incidentService: IncidentsService) {}

    @Get()
    info() {
        return {
            message: 'Use POST to create an incident',
            body: { title: 'string', description: 'string', lat: 'number', lon: 'number', type: 'IncidentType (1-23)' },
        };
    }

    @Post()
    async createIncident(@Body() incident: IncidentCDto) {
        const { title, description, lat, lon, type } = incident ?? {};
        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof lat !== 'number' ||
            typeof lon !== 'number' ||
            typeof type !== 'number'
        ) {
            throw new BadRequestException(
                'Body must be: { "title": "string", "description": "string", "lat": number, "lon": number, "type": number (1-23) }',
            );
        }
        const result = await this.incidentService.createIncident(incident);
        return result;
    }
}
