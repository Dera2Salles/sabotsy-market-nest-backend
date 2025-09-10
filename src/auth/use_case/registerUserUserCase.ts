import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repository/UserRepository';
import { UserEntity } from '../domain/Entities/user.entity';

@Injectable()
export class RegisterUserUseCase {
  constructor(@Inject(UserRepository) private repository: UserRepository) {}

  execute(user: UserEntity) {
    return this.repository.register(user);
  }
}
