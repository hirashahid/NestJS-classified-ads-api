import { Controller } from '@nestjs/common';

import { UserAuthService } from '@app/modules/user/services/auth.service';

@Controller('user')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}
}
