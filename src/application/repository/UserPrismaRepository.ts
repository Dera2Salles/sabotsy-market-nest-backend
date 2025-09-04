import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { UserRepository } from '@/domain/repository';
import { UserEntity } from '@/domain/Entities';

import {
  DatabaseError,
  UserAlreadyExistException,
  UserNotFoundException,
} from '@/domain/Exceptions';
import { failure, Result, success } from '@/domain/Types/Result';

export interface loginReturnType {
  id: string;
  password: string;
  product: {
    id: string;
    name: string;
    updatedAt: Date;
    filename: string | null;
    category: string;
    description: string;
    price: number;
    unit: number;
    producerId: string;
    addedAt: Date;
  }[];
}

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async signIn(
    userId: string,
  ): Promise<Result<loginReturnType, UserNotFoundException>> {
    try {
      const user = await this.prisma.producer.findFirst({
        where: {
          OR: [
            {
              email: userId,
            },
            {
              id: userId,
            },
          ],
        },
        select: { id: true, password: true, product: true },
      });

      if (!user) {
        return failure(new UserNotFoundException());
      }

      return success(user);
    } catch (error) {
      console.error('Error', error);
      return failure(new UserNotFoundException());
    }
  }

  async register(
    user: UserEntity,
  ): Promise<Result<void, UserAlreadyExistException>> {
    try {
      await this.prisma.producer.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
      return success(undefined);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == 'P2002') return failure(new UserAlreadyExistException());
      }
      return failure(new DatabaseError());
    }
  }
}
