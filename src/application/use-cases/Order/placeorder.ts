import { OrderEntity } from '@/domain/Entities/Order';
import { OrderRepository } from '@/domain/repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PlaceOrderUseCase {
  constructor(@Inject(OrderRepository) private source: OrderRepository) {}

  async execute(order: OrderEntity) {
    return this.source.placeOrder(order);
  }
}
