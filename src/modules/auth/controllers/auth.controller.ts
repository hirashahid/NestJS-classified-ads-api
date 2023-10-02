import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UserLoginDto } from '@app/modules/user/dto/user.login';
import { AuthService } from '@app/modules/auth/services/auth.service';

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
    response.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 50 * 60 * 1000),
    });
    return { data, message };
  }
}
