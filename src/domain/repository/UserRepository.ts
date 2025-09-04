import type { Result } from '../Types/Result';
import type { UserEntity } from '../Entities/User';
import {
  UserAlreadyExistException,
  UserNotFoundException,
} from '../Exceptions';
import { loginReturnType } from '@/application/repository/UserPrismaRepository';

export abstract class UserRepository {
  abstract signIn(
    login: string,
  ): Promise<Result<loginReturnType, UserNotFoundException>>;
  abstract register(
    user: UserEntity,
  ): Promise<Result<void, UserAlreadyExistException>>;
}
