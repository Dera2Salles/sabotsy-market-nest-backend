import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repository/UserRepository';

@Injectable()
export class GetUserDataUseCase {
  constructor(@Inject(UserRepository) private repository: UserRepository) {}

  async execute(userId: string, page: number, limit: number) {
    return this.repository.getData(userId, page, limit);
  }
}
