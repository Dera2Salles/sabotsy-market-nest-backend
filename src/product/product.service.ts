import { GetProductUseCase } from '@/application/use-cases/product/get';
import { InsertProductUseCase } from '@/application/use-cases/product/insert';
import { ProductEntity } from '@/domain/Entities/Product';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    private insertProduct: InsertProductUseCase,
    private getProduct: GetProductUseCase,
  ) {}

  async callInsertProduct(product: ProductEntity[]) {
    const result = await this.insertProduct.exexute(product);
    if (result.status == 'failure') throw new ForbiddenException();
  }

  async callGetProduct() {
    const result = await this.getProduct.exexute();
    if (result.status == 'failure') throw new ForbiddenException();
    return result;
  }
}
