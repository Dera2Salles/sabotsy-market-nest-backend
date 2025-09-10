import { ProductEntity } from '@/product/domain/Entitie/Product';
import { ProductRepository } from '@/product/domain/repository/ProductRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class InsertProductUseCase {
  constructor(@Inject(ProductRepository) private source: ProductRepository) {}

  async exexute(product: ProductEntity[]) {
    return this.source.insertMany(product);
  }
}
