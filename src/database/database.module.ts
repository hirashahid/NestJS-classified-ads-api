import { Module } from '@nestjs/common';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';
import { MongoPrismaService } from '@app/database/mongo-prisma.service';

@Module({
  providers: [PostgresPrismaService, MongoPrismaService],
  exports: [PostgresPrismaService],
})
export class DatabaseModule {}
