import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UserLoginDto } from '@app/modules/user/dto/login.dto';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { errorMessages } from '@app/common/constants/errorMessages';
import { CustomException } from '@app/exceptions/custom.exception';
import { successMessages } from '@app/common/constants/successMessages';
import { UserRegistrationDto } from '@app/modules/user/dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(
    @Body() userRegistration: UserRegistrationDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { message, data, token } =
      await this.authService.registration(userRegistration);
    response.cookie('USER_ACCESS_TOKEN', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { message, data };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() userRegistration: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data, token, message } =
      await this.authService.login(userRegistration);
    response.cookie('USER_ACCESS_TOKEN', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { message, data };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    try {
      response.clearCookie('USER_ACCESS_TOKEN', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return { message: successMessages.logoutSuccessfully };
    } catch (error) {
      throw new CustomException(
        errorMessages.logoutFailed,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
