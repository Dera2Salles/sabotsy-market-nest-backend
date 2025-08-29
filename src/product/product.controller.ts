import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from '@/domain/Entities/Product';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}

  @Post()
  async insertProduct(@Body() product: ProductEntity[]) {
    return this.service.callInsertProduct(product);
  }
}
