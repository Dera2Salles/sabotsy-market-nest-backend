import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from '@/domain/Entities';
import { UserUseCase } from '../use-cases';

@Controller('auth')
export class AuthController {
  constructor(private autService: UserUseCase) {}

  @Post('login')
  login(@Body() userData: { numberPhone: string }) {
    const result = this.autService.findById(parseInt(userData.numberPhone));
    if (result.status === 'failure') return { msg: 'tsiy' };
    console.log('userdata', result.data);
    return { msg: 'logged in', data: userData };
  }

  @Post('signin')
  signin(@Body() userData: UserEntity) {
    const result = this.autService.register(userData);
    if (result.status === 'failure') return { msg: result.error };
    return { msg: 'signed in', data: userData };
  }
}
