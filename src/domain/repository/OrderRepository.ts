import type { OrderEntity } from '../Entities/Order';
import type { ProductEntity } from '../Entities/Product';
import type { Result } from '../Types/Result';

export abstract class OrderRepository {
  abstract createOrder(): Result<void, Error>;

  abstract addProductToTheOrder(
    product: ProductEntity,
  ): Result<OrderEntity, Error>;

  abstract removeProductToTheOrder(productId: number): Result<void, Error>;
}
