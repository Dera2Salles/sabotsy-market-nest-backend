import { UserRepository } from '@/domain/repository';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RegisterUserUseCase } from '@/application/use-cases/User/registerUserUserCase';
import { FindUserUseCase } from '@/application/use-cases/User/findUser';
import { UserPrismaRepository } from '@/application/repository/UserPrismaRepository';
import { PrismaModule } from '@/prisma/prisma.module';
import { GetUserDataUseCase } from '@/application/use-cases/User/getData';

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
