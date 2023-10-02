import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';

export const postgresConfig:
  | TypeOrmModuleOptions
  | Promise<TypeOrmModuleOptions> = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
};
