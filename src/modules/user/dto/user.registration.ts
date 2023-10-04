import {
  IsString,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsDateString,
  IsOptional,
  Matches,
} from 'class-validator';

import { Gender, RoleType, UserType } from '@app/modules/user/constants/user';

export class UserRegistrationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
  @Matches('password')
  confirmPassword: string;

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
  @Matches(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, {
    message: 'Please enter a valid phone number',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'birthDate must be in YYYY-MM-DD format',
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
