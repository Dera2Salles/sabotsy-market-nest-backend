import type { OrderEntity } from '../../domain/Entities/Order';
import type { ProductEntity } from '../../domain/Entities/Product';
import { OrderModel } from '../../domain/models/Order';
import type { OrderRepository } from '../../domain/repository/OrderRepository';
import type { ProductRepository } from '@/domain/repository/ProductRepository';
import type { Result } from '../../domain/Types';
import { success, failure } from '../../domain/Types/Result';

export class OrderRepositoryImpl implements OrderRepository {
  private order: OrderModel;
  constructor(private source: ProductRepository) {
    this.order = new OrderModel();
  }

  createOrder(): Result<void, Error> {
    this.order.createOrder();
    return success(undefined);
  }

  addProductToTheOrder(
    productOrder: ProductEntity,
  ): Result<OrderEntity, Error> {
    const isOrderPlaced = this.order.verifyIsPlaced();
    if (isOrderPlaced.status === 'failure') {
      this.order.createOrder();
    }

    const result = this.order.addProductToTheOrder(productOrder);
    if (result.status === 'failure') return failure(result.error);
    const resultOrder = this.order.getData();
    if (resultOrder.status === 'failure') return failure(resultOrder.error);

    return success(resultOrder.data);
  }

  removeProductToTheOrder(productId: number): Result<void, Error> {
    const result = this.order.removeProductToTheOrder(productId);
    if (result.status === 'failure') return failure(result.error);
    return success(undefined);
  }
}
