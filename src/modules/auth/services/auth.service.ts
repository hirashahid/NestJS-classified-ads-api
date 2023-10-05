import { Dependencies, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { errorMessages } from '@app/common/constants/errorMessages';
import { UserLoginDto } from '@app/modules/user/dto/login-dto';
import { UserAuthService } from '@app/modules/user/services/auth.service';
import { successMessages } from '@app/common/constants/successMessages';
import { UserSerialization } from '@app/modules/auth/serialization/user.serialization';

@Dependencies(UserAuthService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private readonly usersAuthService: UserAuthService,
    private readonly jwtService: JwtService,
  ) {}

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

  async serializeUserProfile(user: any) {
    return plainToClass(UserSerialization, user, {
      excludeExtraneousValues: true,
    });
  }
}
