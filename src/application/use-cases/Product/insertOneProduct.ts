import { ProductModel } from '@/domain/models';
import type { ProductEntity } from '../../../domain/Entities/Product';
import type { ProductRepository } from '../../../domain/repository/ProductRepository';

import { success, type Result } from '../../../domain/Types/Result';
import { Inject, Injectable } from '@nestjs/common';
import { ProductMemoryStorage } from '@/application/database';

@Injectable()
export class InsertOneProduct {
  constructor(
    @Inject(ProductMemoryStorage) private repository: ProductRepository,
  ) {}

  execute(productDto: ProductEntity): Result<void> {
    const result = this.repository.getOneByName(productDto.name);
    if (result.status === 'success') {
      const productModel = new ProductModel(result.data);

      productModel.increaseUnit(result.data.unit);
      // const updatedProduct = productModel.snapshot();
      // this.update(updatedProduct);
    } else {
      this.repository.insertOne(productDto);
    }
    return success(undefined);
  }
}
