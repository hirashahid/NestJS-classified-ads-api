import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
  UseGuards,
  Query,
  Get,
} from '@nestjs/common';
import { Response } from 'express';

import { UserLoginDto } from '@app/modules/user/dto/login.dto';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { errorMessages } from '@app/common/constants/errorMessages';
import { CustomException } from '@app/exceptions/custom.exception';
import { successMessages } from '@app/common/constants/successMessages';
import { ApiAuthGuard } from '@app/modules/auth/guards/api-auth.guard';
import { UserRegistrationDto } from '@app/modules/user/dto/registration.dto';
import { ForgotPasswordDto } from '@app/modules/user/dto/forgotPassword.dto';
import { User } from '@app/decorators/user.decorator';
import { PasswordResetDto } from '@app/modules/user/dto/passwordReset.dto';
import { JwtAuthGuard } from '@app/modules/auth/guards/auth.guard';
import { ForgotPasswordResetDto } from '@app/modules/user/dto/forgotPasswordReset.dto';

@UseGuards(ApiAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch('password-reset')
  async passwordReset(
    @User() user: any,
    @Body() passwordResetDto: PasswordResetDto,
  ) {
    const { message } = await this.authService.resetPassword(
      user,
      passwordResetDto,
    );
    return { message };
  }

  @Post('forgot-password-initiate')
  async sendEmail(@Body() email: ForgotPasswordDto) {
    const message = await this.authService.sendEmail(email);
    return { message };
  }

  @Get('verify-token')
  async verifyToken(
    @Query('token') token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.verifyToken(token, response);
  }

  @Patch('forgot-password-complete')
  async resetPassword(
    @Query('token') token: string,
    @Body() forgotPasswordResetDto: ForgotPasswordResetDto,
  ) {
    const message = await this.authService.resetForgotPassword(
      token,
      forgotPasswordResetDto,
    );
    return { message };
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
