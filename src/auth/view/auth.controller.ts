import { FastifyReply } from 'fastify';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { LoginDto } from '../domain/Entities/login_Dto';
import { UserEntity } from '../domain/Entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private autService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() loginData: LoginDto, @Res() reply: FastifyReply) {
    const { token, msg, name } = await this.autService.logIn(loginData);

    reply.setCookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
      maxAge: 24 * 60 * 60, // 1 jour en secondes
      domain: 'localhost',
    });

    return reply.send({ msg, name });
  }

  @Post('signup')
  signup(@Body() userData: UserEntity) {
    return this.autService.signUp(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserData(
    @Req() req: Request,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.autService.getUser(req.user as string, page, limit);
  }
}
