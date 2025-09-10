import type { Result } from '@/core/Result';
import { OrderEntity } from '../Entity/Order';

export abstract class OrderRepository {
  abstract placeOrder(order: OrderEntity): Promise<Result<void, Error>>;

  // abstract cancelOrder(orderId: number): Promise<Result<void, Error>>;
}
