import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@app/modules/auth/controllers/auth.controller';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { jwtFactory } from '@app/modules/auth/config/jwt.config';
import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';
import { UserAuthService } from '@app/modules/user/services/auth.service';
import { PostgresQueriesService } from '@app/database/postgresQueries/userQueries.service';

@Module({
  imports: [JwtModule.registerAsync(jwtFactory)],
  providers: [
    AuthService,
    UserAuthService,
    JwtStrategy,
    PostgresPrismaService,
    PostgresQueriesService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
