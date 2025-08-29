import { UserRepository } from '@/domain/repository';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './Jwt.guard';
import { RegisterUserUseCase } from '@/application/use-cases/User/registerUserUserCase';
import { FindUserUseCase } from '@/application/use-cases/User/findUser';
import { UserPrismaRepository } from '@/application/repository/UserPrismaRepository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    { provide: UserRepository, useClass: UserPrismaRepository },

    JwtStrategy,
    AuthService,
    JwtGuard,
    FindUserUseCase,
    RegisterUserUseCase,
  ],
  exports: [JwtGuard],
})
export class AuthModule {}
