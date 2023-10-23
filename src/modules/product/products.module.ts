import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtFactory } from '@app/modules/auth/config/jwt.config';
import { JwtStrategy } from '@app/modules/auth/strategies/jwt.strategy';
import { UserAuthService } from '@app/modules/user/services/auth.service';
import { ProductController } from '@app/modules/product/controllers/product.controller';
import { ProductService } from '@app/modules/product/services/product.service';
import { MongoPrismaService } from '@app/database/mongo-prisma.service';
import { ProductQueriesService } from '@app/database/mongoDbQueries/productQueries.service';
import { PostgresQueriesService } from '@app/database/postgresQueries/userQueries.service';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';

@Module({
  imports: [JwtModule.registerAsync(jwtFactory)],
  providers: [
    ProductService,
    UserAuthService,
    JwtStrategy,
    MongoPrismaService,
    ProductQueriesService,
    PostgresQueriesService,
    PostgresPrismaService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
