import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { DatabaseModule } from '@app/modules/database/database.module';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { CustomExceptionFilter } from '@app/filters/global-exception.filter';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { DestinationsModule } from '@app/modules/destination/destination.module';
import { postgresConfig } from '@app/config/postgres/database.config';
import { mongoConfig } from '@app/config/mongo/database.config';
import { AdminModule } from '@app/modules/admin/admin.module';

@Module({
  imports: [
    // PRIMARY DB CONNECTION
    TypeOrmModule.forRootAsync({
      useFactory: () => postgresConfig,
    }),

    // SECONDARY DB CONNECTION
    TypeOrmModule.forRootAsync({
      name: 'secondaryDB',
      useFactory: () => mongoConfig,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    DestinationsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, CustomExceptionFilter],
})
export class AppModule {}
