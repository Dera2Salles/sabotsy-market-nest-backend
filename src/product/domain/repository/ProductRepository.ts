import type { Result } from '../../../core/Result';
import type { ProductEntity } from '../Entitie/Product';
// import { ProductNotFoundException } from '../Exceptions';

export interface InsertReturnType {
  productId: string;
  productName: string;
}

export abstract class ProductRepository {
  abstract insertMany(
    product: ProductEntity[],
  ): Promise<Result<InsertReturnType[], Error>>;

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
