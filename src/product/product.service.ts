import { InsertProductUseCase } from '@/application/use-cases/product/insert';
import { ProductEntity } from '@/domain/Entities/Product';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private insertProduct: InsertProductUseCase) {}

  async callInsertProduct(product: ProductEntity[]) {
    const result = await this.insertProduct.exexute(product);
    if (result.status == 'failure') throw new ForbiddenException();
  }
}
