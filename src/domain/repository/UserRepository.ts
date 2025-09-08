import type { Result } from '../Types/Result';
import type { UserEntity } from '../Entities/User';
import {
  UserAlreadyExistException,
  UserNotFoundException,
} from '../Exceptions';
import { LoginDto } from '@/auth/loginDto';
import { ProductEntity } from '../Entities/Product';

export interface UserData {
  name: string;
  product: ProductEntity[];
}

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
