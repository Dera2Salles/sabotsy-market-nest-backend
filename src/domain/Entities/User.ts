import { IsEmail, IsNotEmpty } from 'class-validator';
import type { UserRole } from '../Types/Role';

export class UserEntity {
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  nom: string;
  password: string;
  role: UserRole;
}
