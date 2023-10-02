import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
