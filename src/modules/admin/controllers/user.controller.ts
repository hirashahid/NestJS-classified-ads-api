import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserAuthService } from '@app/modules/user/services/auth.service';
import { GetAllUsersQueryDto } from '@app/modules/user/dto/get-all-users-dto';
import { JwtAuthGuard } from '@app/modules/auth/guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Get()
  async getAllUsers(@Query() query: GetAllUsersQueryDto) {
    const { data, total, meta } = await this.userAuthService.getAllUsers(query);
    return { data, total, meta };
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userAuthService.findUserById(id);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userAuthService.deleteUser(id);
  }
}
