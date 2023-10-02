import { Body, Controller, Post } from '@nestjs/common';
import { UserAuthService } from '@app/modules/user/services/user-auth.service';
import { UserRegistrationDto } from '@app/modules/user/dto/user.registration';

@Controller('user')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('registration')
  async registration(@Body() userRegistration: UserRegistrationDto) {
    return await this.userAuthService.registration(userRegistration);
  }
}
