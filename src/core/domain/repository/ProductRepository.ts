import type { Result } from '../Types/Result';
import type { ProductEntity } from '../Entities/Product';
import { ProductNotFoundException } from '../Exceptions';

export abstract class ProductRepository {
  abstract insertOne(product: ProductEntity): Result<void, Error>;

  abstract insertMany(product: ProductEntity[]): Result<void, Error>;

  abstract getAll(): Result<ProductEntity[], Error>;

  abstract getOneByName(
    productName: string,
  ): Result<ProductEntity, ProductNotFoundException>;

  abstract update(product: ProductEntity): Result<void, Error>;

  // deleteOneById(productId: number): Promise<Result<void>>;
}
