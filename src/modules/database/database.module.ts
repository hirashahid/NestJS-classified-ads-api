import { Module } from '@nestjs/common';
import { DatabaseController } from './controllers/database.controller';
import { DatabaseService } from './services/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
