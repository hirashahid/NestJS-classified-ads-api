import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@app/modules/auth/controllers/auth.controller';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { UserAuthService } from '@app/modules/user/services/auth.service';
import { User } from '@app/modules/user/entities/user.entity';
import { jwtFactory } from '@app/modules/auth/config/jwt.config';
import { DatabaseModule } from '@app/database/database.module';
import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtFactory),
    DatabaseModule,
  ],
  providers: [AuthService, UserAuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
