import type { Result } from './../Types/Result';
import type { ProductEntity } from '../Entities/Product';
// import { ProductNotFoundException } from '../Exceptions';

export abstract class ProductRepository {
  abstract insertMany(product: ProductEntity[]): Promise<Result<void, Error>>;

  // abstract getAll(): Promise<Result<ProductEntity[], Error>>;

  // abstract getOneByName(
  //   productName: string,
  // ): Promise<Result<ProductEntity, ProductNotFoundException>>;

  // abstract update(product: ProductEntity): Promise<Result<void, Error>>;

  // deleteOneById(productId: number): Promise<Result<void>>;
}
