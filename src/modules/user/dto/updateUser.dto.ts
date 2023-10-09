import {
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
  Matches,
} from 'class-validator';

import { Gender } from '@app/modules/user/constants/user';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?:\+92|0)[1-9]\d{9}$/, {
    message: 'Please enter a valid phone number',
  })
  phone: string;

  @IsString()
  @IsOptional()
  @IsDateString()
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
}
