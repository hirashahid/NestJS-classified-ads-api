import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationsService } from './destination.service';
import { DestinationsController } from './destination.controller';
import { Destination } from './entities/destination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Destination], 'secondaryDB')],
  controllers: [DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}
