import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ProductEntity } from '@/domain/Entities';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  addProduct(@Body() product: ProductEntity) {
    return this.orderService.addProductService(product);
  }

  @Get()
  getProduct() {
    return this.orderService.getOrderService();
  }
}
