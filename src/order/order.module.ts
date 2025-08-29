import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderPrismaRepository } from '@/application/repository/OrderPrismaRepository';
import { PlaceOrderUseCase } from '@/application/use-cases/Order/placeorder';
import { OrderRepository } from '@/domain/repository';

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
