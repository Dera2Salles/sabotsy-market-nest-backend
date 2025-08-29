import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from '@/domain/Entities/Order';

@Controller('order')
export class OrderController {
  constructor(private service: OrderService) {}

  @Post()
  async addOrder(@Body() order: OrderEntity) {
    return this.service.callPlaceOrder(order);
  }
}
