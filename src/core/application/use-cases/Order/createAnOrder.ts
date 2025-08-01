import type { OrderRepository } from '@/core/domain/repository/OrderRepository';

export class CreateAnOrder {
  constructor(private repository: OrderRepository) {}

  execute() {
    return this.repository.createOrder();
  }
}
