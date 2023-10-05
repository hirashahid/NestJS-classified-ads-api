import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

import { UserRegistrationDto } from '@app/modules/user/dto/registration-dto';
import { errorMessages } from '@app/common/constants/errorMessages';
import { UserSerialization } from '@app/modules/auth/serialization/user.serialization';
import {
  EmailAlreadyExistsException,
  NotFoundException,
} from '@app/exceptions/custom.exception';
import { PostgresPrismaService } from '@app/database/postgres-prisma.service';
import { GeneratorProvider } from '@app/providers/generator.provider';
import { successMessages } from '@app/common/constants/successMessages';
import { UserUpdateDto } from '@app/modules/user/dto/update-user-dto';
import { GetAllUsersQueryDto } from '@app/modules/user/dto/get-all-users-dto';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly prisma: PostgresPrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(userRegistrationDto: UserRegistrationDto) {
    const { phone, email } = userRegistrationDto;

    //check if email or phone is already registered
    const [phoneExists, emailExists] = await Promise.all([
      this.prisma.user.findUnique({ where: { phone } }),
      this.prisma.user.findUnique({ where: { email } }),
    ]);

    if (phoneExists || emailExists) {
      throw new EmailAlreadyExistsException(
        phoneExists ? errorMessages.phoneExists : errorMessages.emailExists,
      );
    }

    const salt = crypto.randomBytes(48).toString('hex');
    const hashedPassword = bcrypt.hashSync(
      userRegistrationDto.password + salt,
      10,
    );

    userRegistrationDto.salt = salt;
    userRegistrationDto.password = hashedPassword;

    // eslint-disable-next-line
    const { ...userRegistrationData } = userRegistrationDto;
    const uuid = GeneratorProvider.uuid();
    const userData = { ...userRegistrationData, uuid };
    const user = await this.prisma.user.create({
      data: userData,
    });
    const userObj = {
      uuid: user.uuid,
      role: user.role,
      type: user.type,
    };
    const token = await this.jwtService.signAsync({ userObj });
    return {
      message: successMessages.userRegistered,
      data: await this.serializeUserProfile(user),
      token,
    };
  }

  async getAllUsers(query: GetAllUsersQueryDto) {
    query.paginate = query.paginate ? query.paginate : 15;
    query.page = query.page ? query.page : 1;
    const skip = (query.page - 1) * query.paginate;
    const search = query?.search;
    let users: any[];

    if (search) {
      users = await this.prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { phone: { contains: search } },
          ],
        },
        skip: skip,
        take: query.paginate,
      });
    } else {
      users = await this.prisma.user.findMany({
        skip: skip,
        take: query.paginate,
      });
    }
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
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { uuid: username }],
      },
    });

    if (!userExists) throw new NotFoundException(errorMessages.userNotFound);
    return userExists;
  }

  async findUserById(uuid: string) {
    const userExists = await this.findOne(uuid);
    return await this.serializeUserProfile(userExists);
  }

  async updateUser(updateUserDto: UserUpdateDto, uuid: string) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { uuid },
        data: { ...updateUserDto },
      });

      let message = errorMessages.userUpdationFailed;

      if (updatedUser) {
        message = successMessages.userUpdatedSuccessfully;
        return { message, data: await this.serializeUserProfile(updatedUser) };
      }

      return { message, data: null };
    } catch (error) {
      return { message: errorMessages.userUpdationFailed, data: null };
    }
  }

  async deleteUser(uuid: string) {
    await this.prisma.user.delete({
      where: { uuid },
    });

    return { message: successMessages.userHasBeenDeleted };
  }

  async serializeUserProfile(user: any) {
    return plainToClass(UserSerialization, user, {
      excludeExtraneousValues: true,
    });
  }
}
