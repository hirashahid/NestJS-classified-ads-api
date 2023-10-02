import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination, 'secondaryDB')
    private destinationsRepository: Repository<Destination>,
  ) {}

  async create(name: string) {
    const destination = new Destination();
    destination.name = name;

    await this.destinationsRepository.save(destination);
    return destination;
  }

  findAll() {
    return this.destinationsRepository.find();
  }
}
