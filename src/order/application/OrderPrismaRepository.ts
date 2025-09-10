import { PrismaService } from '@/prisma/prisma.service';
import { failure, Result, success } from '@/core/Result';

import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../domain/Entity/Order';
import { OrderRepository } from '../domain/repository/OrderRepository';

@Injectable()
export class OrderPrismaRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async placeOrder(order: OrderEntity): Promise<Result<void, Error>> {
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
                producerId: product.producerId,
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
