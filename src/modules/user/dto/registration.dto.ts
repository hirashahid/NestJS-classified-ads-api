import {
  IsString,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  Matches,
} from 'class-validator';

import { Gender, RoleType, UserType } from '@app/modules/user/constants/user';

export class UserRegistrationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  uuid: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).*$/, {
    message: 'Password must contain alphabet,numbers and special characters',
  })
  password: string;

  @IsString()
  @IsEnum(UserType)
  @IsOptional()
  type: UserType;

  @IsString()
  @IsEnum(RoleType)
  @IsOptional()
  role: RoleType;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:\+92|0)[1-9]\d{9}$/, {
    message: 'Please enter a valid phone number',
  })
  phone: string;

  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'BirthDate must be in YYYY-MM-DD format',
  })
  birthDate: string;

  @IsString()
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  salt: string;
}
