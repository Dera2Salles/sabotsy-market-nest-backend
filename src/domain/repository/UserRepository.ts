import type { Result } from '../Types/Result';
import type { UserEntity } from '../Entities/User';
import {
  UserAlreadyExistException,
  UserNotFoundException,
} from '../Exceptions';
import { LoginDto } from '@/auth/loginDto';

export abstract class UserRepository {
  abstract signIn(
    login: string,
  ): Promise<Result<LoginDto, UserNotFoundException>>;
  abstract register(
    user: UserEntity,
  ): Promise<Result<void, UserAlreadyExistException>>;
}
