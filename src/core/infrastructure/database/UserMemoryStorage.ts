import type { UserEntity } from '@/core/domain/Entities/User';
import {
  UserNotFoundException,
  UserAlreadyExistException,
} from '@/core/domain/Exceptions';
import type { UserRepository } from '@/core/domain/repository/UserRepository';
import type { Result } from '@/core/domain/Types';
import { failure, success } from '@/core/domain/Types/Result';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMemoryStorage implements UserRepository {
  private user: UserEntity[] = [
    {
      id: parseInt('0388257986'),
      nom: 'Dera',
      email: 'dera@gmail.com',
      password: '1234',
      role: 'Producer',
    },
  ];

  registerUser(user: UserEntity): Result<void, UserAlreadyExistException> {
    const existingUser = this.user.find((u) => u.id === user.id);
    if (existingUser) {
      return failure(new UserAlreadyExistException());
    }
    this.user.push(user);
    return success(undefined);
  }

  findUserbyId(UserId: number): Result<UserEntity, UserNotFoundException> {
    const userFound = this.user.find((user) => user.id == UserId);
    if (!userFound) {
      return failure(new UserNotFoundException('User Not Found'));
    }
    return success(userFound);
  }
}
