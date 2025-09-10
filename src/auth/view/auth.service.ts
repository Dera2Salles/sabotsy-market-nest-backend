import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { FindUserUseCase } from '@/auth/use_case/findUser';
import { RegisterUserUseCase } from '@/auth/use_case/registerUserUserCase';
import { LoginDto } from '../domain/Entities/login_Dto';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../domain/Entities/user.entity';
import { GetUserDataUseCase } from '../use_case/getData';

@Injectable()
export class AuthService {
  constructor(
    private findUser: FindUserUseCase,
    private getUserData: GetUserDataUseCase,
    private registerUser: RegisterUserUseCase,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(userData: UserEntity) {
    const hashedPassword = await argon.hash(userData.password);
    const newUserData = { ...userData, password: hashedPassword };
    const result = await this.registerUser.execute(newUserData);

    if (result.status === 'failure') {
      throw new ForbiddenException('Credential taken');
    }
    return { msg: 'signed in', data: userData };
  }

  async logIn(loginData: LoginDto) {
    const result = await this.findUser.execute(loginData.identifier);

    if (result.status === 'failure') {
      throw new ForbiddenException('Credential not found');
    }

    const isPasswordMatch = await argon.verify(
      result.data.password,
      loginData.password,
    );

    if (!isPasswordMatch) throw new ForbiddenException('Password incorrect');

    const payload = {
      sub: result.data.identifier,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      msg: 'logged in',
      token,
      name: result.data.name,
    };
  }

  async getUser(id: string, page: number, limit: number) {
    const result = await this.getUserData.execute(id, page, limit);
    if (result.status == 'failure') {
      throw new ForbiddenException();
    }
    return { userData: result.data };
  }
}
