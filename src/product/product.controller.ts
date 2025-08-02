import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from '@/domain/Entities';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Post()
  insertOne(@Body() product: ProductEntity) {
    return this.productService.insertOne(product);
  }
  @Post('search')
  search(productName: string, category: string) {
    return this.productService.search(productName, category);
  }
}
