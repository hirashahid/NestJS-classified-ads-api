import { Injectable } from '@nestjs/common';
import {
  EmailAlreadyExistsException,
  NotFoundException,
} from '@app/exceptions/custom.exception';
import { errorMessages } from '@app/common/constants/errorMessages';
import { successMessages } from '@app/common/constants/successMessages';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';
import { UserUpdateDto } from '@app/modules/user/dto/updateUser.dto';

@Injectable()
export class PostgresQueriesService {
  constructor(private readonly prisma: PostgresPrismaService) {}

  async createUser(model: string, data: any) {
    return await this.prisma[model].create({
      data,
    });
  }

  async findUsers(model: string, where: any, skip: number, take: number) {
    const users = await this.prisma[model].findMany({ where, skip, take });
    if (users.length === 0)
      throw new NotFoundException(errorMessages.userNotFound);
    return users;
  }

  async findOne(model: string, search: string) {
    const userExists = await this.prisma[model].findFirst({
      where: {
        OR: [{ email: search }, { uuid: search }],
      },
    });

    if (!userExists) throw new NotFoundException(errorMessages.userNotFound);
    return userExists;
  }

  async findUserByphone(model: string, email: string, phone: string) {
    const [phoneExists, emailExists] = await Promise.all([
      this.prisma[model].findUnique({ where: { phone } }),
      this.prisma[model].findUnique({ where: { email } }),
    ]);

    if (phoneExists || emailExists) {
      throw new EmailAlreadyExistsException(
        phoneExists ? errorMessages.phoneExists : errorMessages.emailExists,
      );
    }
  }

  async updateUser(model: string, updateUserDto: UserUpdateDto, uuid: string) {
    const updatedUser = await this.prisma[model].update({
      where: { uuid },
      data: updateUserDto,
    });

    const message = !!updatedUser
      ? successMessages.userUpdatedSuccessfully
      : errorMessages.userUpdationFailed;

    return {
      message,
      data: updatedUser ? updatedUser : null,
    };
  }

  async deleteUser(model: string, uuid: string) {
    let message;
    await this.prisma[model]
      .delete({
        where: { uuid },
      })
      .then(() => {
        message = successMessages.userHasBeenDeleted;
      })
      .catch(() => {
        message = errorMessages.userUpdationFailed;
      });

    return { message };
  }
}
