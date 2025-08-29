import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { UserEntity } from '@/domain/Entities';
import { LoginDto } from './loginDto';

@Controller('auth')
export class AuthController {
  constructor(private autService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() loginData: LoginDto) {
    return this.autService.logIn(loginData);
  }

  @Post('signup')
  signup(@Body() userData: UserEntity) {
    return this.autService.signUp(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserData(@Req() req: Request) {
    return req.user;
  }
}
