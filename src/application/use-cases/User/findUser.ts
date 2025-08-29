import { UserRepository } from '@/domain/repository/UserRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindUserUseCase {
  constructor(@Inject(UserRepository) private repository: UserRepository) {}

  async execute(userId: string) {
    return this.repository.signIn(userId);
  }
}
