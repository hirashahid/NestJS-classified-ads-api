import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Destination } from 'src/modules/destination/entities/destination.entity';

export const mongoConfig: TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> =
  {
    type: 'mongodb',
    url: process.env.MONGODB_CONNECTION_STRING,
    entities: [Destination],
  };
