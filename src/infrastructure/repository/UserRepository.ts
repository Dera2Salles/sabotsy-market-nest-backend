import type { UserEntity } from '@/domain/Entities/User';

import type {
  UserAlreadyExistException,
  UserNotFoundException,
} from '@/domain/Exceptions';

import type { UserRepository } from '@/domain/repository/UserRepository';
import type { Result } from '@/domain/Types';

import { failure, success } from '@/domain/Types/Result';

export class UserRepositoryImp implements UserRepository {
  constructor(private source: UserRepository) {}

  registerUser(user: UserEntity): Result<void, UserAlreadyExistException> {
    const result = this.source.registerUser(user);
    if (result.status === 'success') return success(undefined);
    return failure(result.error);
  }

  findUserbyId(UserId: number): Result<UserEntity, UserNotFoundException> {
    const result = this.source.findUserbyId(UserId);
    if (result.status === 'success') return success(result.data);

    return failure(result.error);
  }
}
