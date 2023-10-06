import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserAuthService } from '@app/modules/user/services/auth.service';
import { jwtFactory } from '@app/modules/auth/config/jwt.config';
import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';
import { AdminUserController } from '@app/modules/admin/controllers/user.controller';
import { PostgresQueriesService } from '@app/database/postgresQueries/userQueries.service';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';

@Module({
  imports: [JwtModule.registerAsync(jwtFactory)],
  providers: [
    UserAuthService,
    JwtStrategy,
    PostgresPrismaService,
    PostgresQueriesService,
  ],
  controllers: [AdminUserController],
})
export class AdminModule {}
