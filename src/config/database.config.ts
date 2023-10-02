import { registerAs } from '@nestjs/config';
import { DatabaseConfigInterface } from '@app/config/databaseInterface';

export default registerAs<DatabaseConfigInterface>('database', () => ({
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? Number.parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  logging: process.env.NODE_ENVIRONMENT !== 'production',
}));
