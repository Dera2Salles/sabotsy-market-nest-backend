import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RegisterUserUseCase } from '@/auth/use_case/registerUserUserCase';
import { FindUserUseCase } from '@/auth/use_case/findUser';
import { UserPrismaRepository } from '@/auth/application/UserPrismaRepository';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserRepository } from '../domain/repository/UserRepository';
import { JwtStrategy } from './jwt.strategy';
import { GetUserDataUseCase } from '../use_case/getData';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    { provide: UserRepository, useClass: UserPrismaRepository },

    JwtStrategy,
    AuthService,
    FindUserUseCase,
    RegisterUserUseCase,
    GetUserDataUseCase,
  ],
})
export class AuthModule {}
