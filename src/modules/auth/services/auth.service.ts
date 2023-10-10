import { Dependencies, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import { errorMessages } from '@app/common/constants/errorMessages';
import { UserLoginDto } from '@app/modules/user/dto/login.dto';
import { UserAuthService } from '@app/modules/user/services/auth.service';
import { successMessages } from '@app/common/constants/successMessages';
import { UserSerialization } from '@app/modules/auth/serialization/user.serialization';
import { UserRegistrationDto } from '@app/modules/user/dto/registration.dto';
import { GeneratorProvider } from '@app/common/providers/generator.provider';
import { PostgresQueriesService } from '@app/database/postgresQueries/userQueries.service';
import { PasswordResetDto } from '@app/modules/user/dto/passwordReset.dto';

@Dependencies(UserAuthService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private readonly usersAuthService: UserAuthService,
    private readonly jwtService: JwtService,
    private readonly prismaQueries: PostgresQueriesService,
  ) {}

  async registration(userRegistrationDto: UserRegistrationDto) {
    const { phone, email } = userRegistrationDto;
    await this.usersAuthService.findUserByphone(email, phone);
    const salt = crypto.randomBytes(48).toString('hex');
    const hashedPassword = bcrypt.hashSync(
      userRegistrationDto.password + salt,
      10,
    );

    userRegistrationDto.salt = salt;
    userRegistrationDto.password = hashedPassword;

    userRegistrationDto.uuid = GeneratorProvider.uuid();
    const user = await this.usersAuthService.create(userRegistrationDto);
    const userObj = {
      uuid: user.uuid,
      role: user.role,
      type: user.type,
    };
    const token = await this.jwtService.signAsync({ userObj });
    return {
      message: successMessages.userRegistered,
      data: await this.serializeUserProfile(user),
      token,
    };
  }

  async login(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    const user = await this.usersAuthService.findOne(email);
    const { salt } = user;
    const isPasswordMatch = await bcrypt.compare(
      password + salt,
      user.password,
    );

    if (!isPasswordMatch) return { message: errorMessages.incorrectPassword };
    const userObj = {
      uuid: user.uuid,
      role: user.role,
      type: user.type,
    };
    const token = await this.jwtService.signAsync({ userObj });
    return {
      message: successMessages.userloggedIn,
      data: await this.serializeUserProfile(user),
      token,
    };
  }

  async resetPassword(loggedInUser: any, passwordResetDto: PasswordResetDto) {
    const { currentPassword, newPassword } = passwordResetDto;
    const user = await this.usersAuthService.findOne(loggedInUser.email);
    const { salt } = user;
    const isPasswordMatch = await bcrypt.compare(
      currentPassword + salt,
      user.password,
    );
    if (!isPasswordMatch)
      return { message: errorMessages.incorrectCurrentPassword };

    if (isPasswordMatch) {
      const salt = crypto.randomBytes(48).toString('hex');
      const newHashedPassword = bcrypt.hashSync(newPassword + salt, 10);
      await this.usersAuthService.updatePassword(
        salt,
        newHashedPassword,
        loggedInUser,
      );
    }

    return { message: successMessages.passwordUpdatedSuccessfully };
  }

  async serializeUserProfile(user: any) {
    return plainToClass(UserSerialization, user, {
      excludeExtraneousValues: true,
    });
  }
}
