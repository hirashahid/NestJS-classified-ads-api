import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import { UserRegistrationDto } from '@app/modules/user/dto/user.registration';
import { User } from '@app/modules/user/entities/user.entity';
import { errorMessages } from '@app/common/constants/errorMessages';
import { UserSerialization } from '@app/modules/auth/serialization/user.serialization';
import {
  EmailAlreadyExistsException,
  NotFoundException,
} from '@app/exceptions/custom.exception';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registration(userRegistrationDto: UserRegistrationDto) {
    const { phone, email } = userRegistrationDto;

    //check if email or phone is already registered
    const [phoneExists, emailExists] = await Promise.all([
      this.userRepository.count({ where: { phone } }),
      this.userRepository.count({ where: { email } }),
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

    //save user data
    const userSaveInitiate = this.userRepository.create(userRegistrationDto);
    const user = await this.userRepository.save(userSaveInitiate);
    return await this.serializeUserProfile(user);
  }

  async serializeUserProfile(user: any) {
    return plainToClass(UserSerialization, user, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(email: string) {
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (!userExists) throw new NotFoundException(errorMessages.userNotFound);
    return userExists;
  }
}
