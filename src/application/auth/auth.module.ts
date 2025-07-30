import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserUseCase } from '../use-cases';
import { UserRepository } from '@/domain/repository';
import { UserMemoryStorage } from '@/infrastructure/database';

@Module({
  controllers: [AuthController],
  providers: [
    UserUseCase,
    { provide: UserRepository, useClass: UserMemoryStorage },
  ],
})
export class AuthModule {}
