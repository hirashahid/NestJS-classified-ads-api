import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import databaseConfig from '@app/config/database.config';
import { TypeOrmConfigService } from '@app/database/typeorm-config.service';
import { DatabaseModule } from '@app/modules/database/database.module';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import jwtConfig from '@app/config/jwt.config';
import { CustomExceptionFilter } from '@app/filters/global-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, CustomExceptionFilter],
})
export class AppModule {}
