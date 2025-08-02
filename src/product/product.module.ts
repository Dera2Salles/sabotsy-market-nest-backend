import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from '@/domain/repository';
import { ProductMemoryStorage } from '@/application/database';
import { ProductUseCase } from '@/application/repository';
import { FilterAndSortProductsUseCase } from '@/application/utils';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductUseCase,
    FilterAndSortProductsUseCase,
    { provide: ProductRepository, useClass: ProductMemoryStorage },
  ],
})
export class ProductModule {}
