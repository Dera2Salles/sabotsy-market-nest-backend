import type { UserEntity } from '@/domain/Entities/User';
import { UserRepository } from '@/domain/repository/UserRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserUseCase {
  constructor(@Inject(UserRepository) private repository: UserRepository) {}

  register(user: UserEntity) {
    return this.repository.registerUser(user);
  }

  findById(userId: number) {
    return this.repository.findUserbyId(userId);
  }
}
