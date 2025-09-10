import { ProductRepository } from '@/product/domain/repository/ProductRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteProductUseCase {
  constructor(@Inject(ProductRepository) private source: ProductRepository) {}

  async exexute(productId: string) {
    return this.source.delete(productId);
  }
}
