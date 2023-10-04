import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import { UserRegistrationDto } from '@app/modules/user/dto/user.registration';
import { errorMessages } from '@app/common/constants/errorMessages';
import { UserSerialization } from '@app/modules/auth/serialization/user.serialization';
import {
  EmailAlreadyExistsException,
  NotFoundException,
} from '@app/exceptions/custom.exception';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';
import { GeneratorProvider } from '@app/providers/generator.provider';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly prisma: PostgresPrismaService
  ) { }

  async registration(userRegistrationDto: UserRegistrationDto) {
    const { phone, email } = userRegistrationDto;

    //check if email or phone is already registered
    const [phoneExists, emailExists] = await Promise.all([
      this.prisma.user.findUnique({ where: { email: email } }),
      this.prisma.user.findUnique({ where: { phone: phone } }),
    ]);

    if (phoneExists || emailExists) {
      throw new EmailAlreadyExistsException(
        phoneExists ? errorMessages.phoneExists : errorMessages.phoneExists,
      );
    }

    const salt = crypto.randomBytes(48).toString('hex');
    const hashedPassword = bcrypt.hashSync(
      userRegistrationDto.password + salt,
      10,
    );

    userRegistrationDto.salt = salt;
    userRegistrationDto.password = hashedPassword;

    // user data is extracted from dto and uuid is added
    const { confirmPassword, ...userRegistrationData } = userRegistrationDto;
    const uuid = GeneratorProvider.uuid();
    const userData = { ...userRegistrationData, uuid };

    //save user data
    const user = await this.prisma.user.create({
      data: userData
    });
    return await this.serializeUserProfile(user);
  }

  async serializeUserProfile(user: any) {
    return plainToClass(UserSerialization, user, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(email: string) {
    const userExists = await this.prisma.user.findUnique({ where: { email } })
    if (!userExists) throw new NotFoundException(errorMessages.userNotFound);
    return userExists;
  }
}
