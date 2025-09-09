import type { Result } from './../Types/Result';
import type { ProductEntity } from '../Entities/Product';
// import { ProductNotFoundException } from '../Exceptions';

export abstract class ProductRepository {
  abstract insertMany(product: ProductEntity[]): Promise<Result<void, Error>>;

  abstract getAll(
    page: number,
    limit: number,
  ): Promise<Result<ProductEntity[], Error>>;

  abstract delete(productId: string): Promise<Result<void>>;

  // abstract getOneByName(
  //   productName: string,
  // ): Promise<Result<ProductEntity, ProductNotFoundException>>;

  // abstract update(product: ProductEntity): Promise<Result<void, Error>>;
}
