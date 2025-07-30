import type { OrderRepository } from '@/domain/repository/OrderRepository';

export class CreateAnOrder {
  constructor(private repository: OrderRepository) {}

  execute() {
    return this.repository.createOrder();
  }
}