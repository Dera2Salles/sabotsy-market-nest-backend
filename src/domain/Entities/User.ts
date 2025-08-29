import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import type { UserRole } from '../Types/Role';

export class UserEntity {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
