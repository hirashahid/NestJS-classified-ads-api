import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../services/database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('test-connection')
  async testConnection(): Promise<string> {
    return this.databaseService.testDatabaseConnection();
  }
}
