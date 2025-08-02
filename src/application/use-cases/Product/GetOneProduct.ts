import { ProductNotFoundException } from '@/domain/Exceptions';
import type { ProductRepository } from '@/domain/repository/ProductRepository';
import { success } from '@/domain/Types';
import { ProductMemoryStorage } from '@/application/database';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetOneProductByNameUseCase {
  constructor(
    @Inject(ProductMemoryStorage) private repository: ProductRepository,
  ) {}

  execute(productName: string) {
    const result = this.repository.getOneByName(productName);
    if (result.status === 'failure') throw new ProductNotFoundException();

    return success(result);
  }
}
