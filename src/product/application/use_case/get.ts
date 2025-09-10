import { ProductRepository } from '@/product/domain/repository/ProductRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetProductUseCase {
  constructor(@Inject(ProductRepository) private source: ProductRepository) {}

  async exexute(page: number, limit: number) {
    return this.source.getAll(page, limit);
  }
}
