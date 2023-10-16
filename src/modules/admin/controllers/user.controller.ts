import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserAuthService } from '@app/modules/user/services/auth.service';
import { JwtAuthGuard } from '@app/modules/auth/guards/auth.guard';
import { ApiAuthGuard } from '@app/modules/auth/guards/api-auth.guard';
import { AdminGuard } from '@app/modules/admin/guards/admin.guard';
import { GetAllUsersQueryDto } from '@app/modules/user/dto/getAllUsers.dto';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { userDataResponse } from '@app/swagger-docs/response-data-example';
import { userProfileResponse } from '@app/swagger-docs/user-docs';

@UseGuards(JwtAuthGuard, AdminGuard, ApiAuthGuard)
@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all users' })
  async getAllUsers(@Query() query: GetAllUsersQueryDto) {
    const { data, total, meta } = await this.userAuthService.getAllUsers(query);
    return { data, total, meta };
  }

  @Get('/:id')
  @ApiOkResponse(userProfileResponse)
  @ApiNotFoundResponse({ description: 'User does not exist' })
  async getUserById(@Param('id') id: string) {
    return await this.userAuthService.findUserById(id);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'User has been deleted succesfully' })
  @ApiNotFoundResponse({ description: 'User does not exist' })
  async deleteUser(@Param('id') id: string) {
    return await this.userAuthService.deleteUser(id);
  }
}
