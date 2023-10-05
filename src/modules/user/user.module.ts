import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from '@app/modules/user/entities/user.entity';
import { UserAuthController } from '@app/modules/user/controllers/auth.controller';
import { UserAuthService } from '@app/modules/user/services/auth.service';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';
import { jwtFactory } from '@app/modules/auth/config/jwt.config';
import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtFactory),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, PostgresPrismaService, JwtStrategy],
})
export class UserModule {}
