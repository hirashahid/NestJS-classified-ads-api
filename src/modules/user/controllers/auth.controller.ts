import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserAuthService } from '@app/modules/user/services/auth.service';
import { UserRegistrationDto } from '@app/modules/user/dto/registration-dto';

@Controller('user')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('registration')
  async registration(
    @Body() userRegistration: UserRegistrationDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { message, data, token } =
      await this.userAuthService.registration(userRegistration);
    response.cookie('USER_ACCESS_TOKEN', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { message, data };
  }
}
