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
import { LoginDto } from '@/auth/loginDto';
import { UserData } from '@/domain/repository/UserRepository';
import { ProductEntity } from '@/domain/Entities/Product';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async signIn(
    userId: string,
  ): Promise<Result<LoginDto, UserNotFoundException>> {
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
        select: { id: true, password: true, name: true },
      });

      if (!user) {
        return failure(new UserNotFoundException());
      }

      return success({
        identifier: user.id,
        password: user.password,
        name: user.name,
      });
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

  async getData(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Result<UserData>> {
    try {
      const result = await this.prisma.producer.findUnique({
        where: { id: userId },
        select: {
          product: {
            skip: (page - 1) * limit,
            take: limit,
          },
          name: true,
          _count: { select: { product: true } },
        },
      });

      const orderResult = await this.prisma.item.findMany({
        where: { producerId: userId },
      });

      const product = result?.product.map((item) => ({
        id: item.id,
        category: item.category,
        description: item.description,
        filename: item.filename as string,
        name: item.name,
        price: item.price,
        producerId: item.producerId,
        unit: item.unit,
      })) as ProductEntity[];

      const totalProductOnOrder = orderResult.reduce(
        (total, item) => total + item.Quantity,
        0,
      );

      return success({
        name: result?.name as string,
        product,
        productTotalNumber: result?._count.product as number,
        productOnOrderTotalNumber: totalProductOnOrder,
      });
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  }
}
