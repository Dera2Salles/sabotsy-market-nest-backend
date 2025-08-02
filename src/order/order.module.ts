import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateAnOrder } from '@/application/use-cases/Order/createAnOrder';
import { AddProductToTheOrderUseCase } from '@/application/use-cases/Order/addProductOrder';
import { OrderController } from './order.controller';
import { GetOrder } from '@/application/use-cases/Order/getOrder';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    AddProductToTheOrderUseCase,
    CreateAnOrder,
    GetOrder,
  ],
})
export class OrderModule {}
