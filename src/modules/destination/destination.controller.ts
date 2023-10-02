import { Controller, Get, Post, Body } from '@nestjs/common';
import { DestinationsService } from './destination.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  async create(@Body('name') name: string) {
    const destination = await this.destinationsService.create(name);
    return destination;
  }

  @Get()
  findAll() {
    return this.destinationsService.findAll();
  }
}
