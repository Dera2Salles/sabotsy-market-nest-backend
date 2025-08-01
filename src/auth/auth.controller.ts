import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '@/domain/Entities';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Roles } from './auth.decorator';
import { Role } from '@/domain/Types';
import { RolesGuard } from './role.guard';

@Controller('user')
export class AuthController {
  constructor(private autService: AuthService) {}

  @Post('login')
  async logIn(@Body() userData: { numberPhone: string }) {
    return this.autService.logIn(userData);
  }

  @Post('signup')
  signup(@Body() userData: UserEntity) {
    return this.autService.signUp(userData);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Producer)
  @Get()
  getUserData(@Req() req: Request) {
    return req.user;
  }
}
