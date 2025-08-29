import type { OrderEntity } from '../Entities/Order';
import type { Result } from '../Types/Result';

export abstract class OrderRepository {
  abstract placeOrder(order: OrderEntity): Promise<Result<void, Error>>;

  // abstract cancelOrder(orderId: number): Promise<Result<void, Error>>;
}
