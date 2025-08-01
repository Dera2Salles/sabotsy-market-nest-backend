import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRepository } from '@/domain/repository';
import { UserMemoryStorage } from '@/application/database';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { UserUseCase } from '@/application/repository';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './role.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '1234',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserUseCase,
    JwtStrategy,
    { provide: UserRepository, useClass: UserMemoryStorage },
    AuthService,
    RolesGuard,
  ],
})
export class AuthModule {}
