import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import jwtConfig from '@app/config/jwt.config';
import { CustomExceptionFilter } from '@app/filters/global-exception.filter';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { DestinationsModule } from '@app/modules/destination/destination.module';
import { postgresConfig } from '@app/config/postgres/database.config';
import { mongoConfig } from '@app/config/mongo/database.config';
import { DatabaseModule } from '@app/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
      envFilePath: ['.env'],
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, CustomExceptionFilter],
})
export class AppModule { }
