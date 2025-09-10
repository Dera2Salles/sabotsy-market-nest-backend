import { LoginDto } from '@/auth/domain/Entities/login_Dto';
import { UserData } from '../Entities/user.data';
import { UserNotFoundException } from '../exception/UserNotFoundException';
import { UserAlreadyExistException } from '../exception/UserAlreadyExistException';
import { Result } from '@/core/Result';
import { UserEntity } from '../Entities/user.entity';

export abstract class UserRepository {
  abstract signIn(
    login: string,
  ): Promise<Result<LoginDto, UserNotFoundException>>;
  abstract register(
    user: UserEntity,
  ): Promise<Result<void, UserAlreadyExistException>>;

  abstract getData(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Result<UserData>>;
}
