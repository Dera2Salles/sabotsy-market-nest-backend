import type { Result } from '../Types/Result';
import type { UserEntity } from '../Entities/User';
import {
  UserAlreadyExistException,
  UserNotFoundException,
} from '../Exceptions';

export abstract class UserRepository {
  abstract findUserbyId(
    UserId: number,
  ): Result<UserEntity, UserNotFoundException>;
  abstract registerUser(
    user: UserEntity,
  ): Result<void, UserAlreadyExistException>;
}
