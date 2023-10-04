import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@app/modules/user/entities/user.entity';
import { UserAuthController } from '@app/modules/user/controllers/user-auth.controller';
import { UserAuthService } from '@app/modules/user/services/user-auth.service';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserAuthController],
  providers: [UserAuthService, PostgresPrismaService],
})
export class UserModule { }
