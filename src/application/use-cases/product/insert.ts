import { ProductEntity } from '@/domain/Entities/Product';
import { ProductRepository } from '@/domain/repository/ProductRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class InsertProductUseCase {
  constructor(@Inject(ProductRepository) private source: ProductRepository) {}

  async exexute(product: ProductEntity[]) {
    return this.source.insertMany(product);
  }
}
