import { ProductUseCase } from '@/application/repository';
import { ProductEntity } from '@/domain/Entities';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private product: ProductUseCase) {}

  getAll() {
    const result = this.product.getAll();
    if (result.status === 'failure') throw new ForbiddenException(result.error);
    return { data: result.data };
  }
  insertOne(product: ProductEntity) {
    const result = this.product.insertOne(product);
    if (result.status === 'failure') throw new ForbiddenException(result.error);
    return { data: result.data };
  }

  search(productName: string, category: string) {
    return this.product.searchEngine(productName, category);
  }
}
