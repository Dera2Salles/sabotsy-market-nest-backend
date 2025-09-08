import { PrismaService } from '@/prisma/prisma.service';
import { OrderRepository } from '@/domain/repository';
import { OrderEntity } from '@/domain/Entities/Order';
import { RESULT } from '@/domain/Types';
import { failure, success } from '@/domain/Types/Result';

import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderPrismaRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async placeOrder(order: OrderEntity): Promise<RESULT<void, Error>> {
    try {
      await this.prisma.order.create({
        data: {
          TotalItem: order.OrderTotalItemUnit,
          TotalPrice: order.OrderItemsTotalPrice,
          status: order.status,
          item: {
            createMany: {
              data: order.OrderItems.map((product) => ({
                Quantity: product?.unitOnCart,
                productName: product.name,
              })),
            },
          },
        },
      });
      return success(undefined);
    } catch (error) {
      console.error(error);
      return failure(Error());
    }
  }
}
