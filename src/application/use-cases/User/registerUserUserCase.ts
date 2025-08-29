import type { UserEntity } from '@/domain/Entities/User';
import { UserRepository } from '@/domain/repository/UserRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUserUseCase {
  constructor(@Inject(UserRepository) private repository: UserRepository) {}

  execute(user: UserEntity) {
    return this.repository.register(user);
  }
}
