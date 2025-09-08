import { UserRepository } from '@/domain/repository/UserRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserDataUseCase {
  constructor(@Inject(UserRepository) private repository: UserRepository) {}

  async execute(userId: string, page: number, limit: number) {
    return this.repository.getData(userId, page, limit);
  }
}
