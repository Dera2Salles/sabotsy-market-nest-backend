import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from '../domain/Entity/Order';

@Controller('order')
export class OrderController {
  constructor(private service: OrderService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async addOrder(@Body() order: OrderEntity) {
    return this.service.callPlaceOrder(order);
  }
}
