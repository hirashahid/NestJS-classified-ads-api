import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserAuthController } from '@app/modules/user/controllers/auth.controller';
import { UserAuthService } from '@app/modules/user/services/auth.service';
import { jwtFactory } from '@app/modules/auth/config/jwt.config';
import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';
import { PostgresQueriesService } from '@app/database/postgresQueries/userQueries.service';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';

@Module({
  imports: [JwtModule.registerAsync(jwtFactory)],
  controllers: [UserAuthController],
  providers: [
    UserAuthService,
    PostgresPrismaService,
    JwtStrategy,
    PostgresQueriesService,
  ],
})
export class UserModule {}
