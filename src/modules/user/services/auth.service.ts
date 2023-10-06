import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { UserSerialization } from '@app/modules/auth/serialization/user.serialization';
import { PostgresQueriesService } from '@app/database/postgresQueries/userQueries.service';
import { GetAllUsersQueryDto } from '@app/modules/user/dto/getAllUsers.dto';
import { UserUpdateDto } from '@app/modules/user/dto/updateUser.dto';
import { modelNames } from '@app/database/modelNames';

@Injectable()
export class UserAuthService {
  constructor(private readonly prismaQueries: PostgresQueriesService) {}

  async create(data: any) {
    return await this.prismaQueries.createUser(modelNames.user, data);
  }

  async getAllUsers(query: GetAllUsersQueryDto) {
    query.paginate = query.paginate ? query.paginate : 15;
    query.page = query.page ? query.page : 1;
    const skip = (query.page - 1) * query.paginate;
    const search = query?.search;

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { phone: { contains: search } },
          ],
        }
      : {};

    const users = await this.prismaQueries.findUsers(
      modelNames.user,
      where,
      skip,
      query.paginate,
    );

    const serializedUsers = await this.serializeUserProfile(users);
    return {
      data: serializedUsers,
      total: users?.length,
      meta: {
        total: users?.length,
        currentPage: query.page,
        eachPage: query.paginate,
        lastPage: Math.ceil(users?.length / query.paginate),
      },
    };
  }

  async findOne(username: string) {
    return await this.prismaQueries.findOne(modelNames.user, username);
  }

  async findUserByphone(email: string, phone: string) {
    await this.prismaQueries.findUserByphone(modelNames.user, email, phone);
  }

  async findUserById(uuid: string) {
    const userExists = await this.findOne(uuid);
    return await this.serializeUserProfile(userExists);
  }

  async updateUser(updateUserDto: UserUpdateDto, uuid: string) {
    const { message, data } = await this.prismaQueries.updateUser(
      modelNames.user,
      updateUserDto,
      uuid,
    );
    return {
      message,
      data: data ? await this.serializeUserProfile(data) : null,
    };
  }

  async deleteUser(uuid: string) {
    return await this.prismaQueries.deleteUser(modelNames.user, uuid);
  }

  async serializeUserProfile(user: any) {
    return plainToClass(UserSerialization, user, {
      excludeExtraneousValues: true,
    });
  }
}
