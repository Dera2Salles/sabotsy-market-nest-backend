import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { ProductEntity } from '@/domain/Entities';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  addProduct(@Body() product: ProductEntity) {
    return this.orderService.addProductService(product);
  }

  @Get()
  getProduct() {
    return this.orderService.getOrderService();
  }
}
