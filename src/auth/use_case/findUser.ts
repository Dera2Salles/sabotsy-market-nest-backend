import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repository/UserRepository';

@Injectable()
export class FindUserUseCase {
  constructor(@Inject(UserRepository) private repository: UserRepository) {}

  async execute(userId: string) {
    return this.repository.signIn(userId);
  }
}
