import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderPrismaRepository } from '@/order/application/OrderPrismaRepository';
import { PlaceOrderUseCase } from '@/order/use_case/placeorder';
import { OrderService } from './order.service';
import { OrderRepository } from '../domain/repository/OrderRepository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    PlaceOrderUseCase,
    PrismaService,
    { provide: OrderRepository, useClass: OrderPrismaRepository },
  ],
})
export class OrderModule {}
