import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async testDatabaseConnection(): Promise<string> {
    try {
      await this.userRepository.find();
      return 'Database connected successfully';
    } catch (error) {
      throw new Error('Database connection error: ' + error.message);
    }
  }
}
