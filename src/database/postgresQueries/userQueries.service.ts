import { Injectable } from '@nestjs/common';
import {
  EmailAlreadyExistsException,
  NotFoundException,
} from '@app/exceptions/custom.exception';
import { errorMessages } from '@app/common/constants/errorMessages';
import { successMessages } from '@app/common/constants/successMessages';
import { UserUpdateDto } from '@app/modules/user/dto/update-user-dto';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';

@Injectable()
export class PostgresQueriesService {
  constructor(private readonly prisma: PostgresPrismaService) {}

  async createUser(data: any) {
    return await this.prisma.user.create({
      data,
    });
  }

  async findUsers(where: any, skip: number, take: number) {
    const users = await this.prisma.user.findMany({ where, skip, take });
    if (users.length === 0)
      throw new NotFoundException(errorMessages.userNotFound);
    return users;
  }

  async findOne(search: string) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: search }, { uuid: search }],
      },
    });

    if (!userExists) throw new NotFoundException(errorMessages.userNotFound);
    return userExists;
  }

  async findUserByphone(email: string, phone: string) {
    const [phoneExists, emailExists] = await Promise.all([
      this.prisma.user.findUnique({ where: { phone } }),
      this.prisma.user.findUnique({ where: { email } }),
    ]);

    if (phoneExists || emailExists) {
      throw new EmailAlreadyExistsException(
        phoneExists ? errorMessages.phoneExists : errorMessages.emailExists,
      );
    }
  }

  async updateUser(updateUserDto: UserUpdateDto, uuid: string) {
    const updatedUser = await this.prisma.user.update({
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

  async deleteUser(uuid: string) {
    let message;
    await this.prisma.user
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
