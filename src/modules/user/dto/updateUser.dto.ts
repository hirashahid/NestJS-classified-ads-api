import {
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
  Matches,
} from 'class-validator';

import { Gender } from '@app/modules/user/constants/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Matches(/^(?:\+92|0)[1-9]\d{9}$/, {
    message: 'Please enter a valid phone number',
  })
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'BirthDate must be in YYYY-MM-DD format',
  })
  birthDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;
}
