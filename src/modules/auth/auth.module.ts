import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@app/modules/auth/controllers/auth.controller';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { UserAuthService } from '@app/modules/user/services/user-auth.service';
import { User } from '@app/modules/user/entities/user.entity';
import { jwtFactory } from '@app/modules/auth/config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtFactory),
  ],
  providers: [AuthService, UserAuthService],
  controllers: [AuthController],
})
export class AuthModule {}
