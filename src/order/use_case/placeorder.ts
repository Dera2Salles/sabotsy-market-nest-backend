import { Inject, Injectable } from '@nestjs/common';
import { OrderEntity } from '../domain/Entity/Order';
import { OrderRepository } from '../domain/repository/OrderRepository';

@Injectable()
export class PlaceOrderUseCase {
  constructor(@Inject(OrderRepository) private source: OrderRepository) {}

  async execute(order: OrderEntity) {
    return this.source.placeOrder(order);
  }
}
