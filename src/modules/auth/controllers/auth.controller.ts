import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UserLoginDto } from '@app/modules/user/dto/login-dto';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { errorMessages } from '@app/common/constants/errorMessages';
import { CustomException } from '@app/exceptions/custom.exception';
import { successMessages } from '@app/common/constants/successMessages';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
