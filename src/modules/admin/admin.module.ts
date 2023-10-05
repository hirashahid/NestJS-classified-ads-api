import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAuthService } from '@app/modules/user/services/auth.service';
import { jwtFactory } from '@app/modules/auth/config/jwt.config';
import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';
import { AdminUserController } from '@app/modules/admin/controllers/user.controller';
import { User } from '@app/modules/user/entities/user.entity';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtFactory),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserAuthService, JwtStrategy, PostgresPrismaService],
  controllers: [AdminUserController],
})
export class AdminModule {}
