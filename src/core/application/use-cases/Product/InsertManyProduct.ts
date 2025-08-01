import type { ProductEntity } from '@/core/domain/Entities/Product';
import type { ProductRepository } from '@/core/domain/repository/ProductRepository';

export class InsertManyProduct {
  constructor(private repository: ProductRepository) {}

  execute(product: ProductEntity[]) {
    return this.repository.insertMany(product);
  }
}
