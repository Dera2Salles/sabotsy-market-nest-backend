import { PlaceOrderUseCase } from '@/order/use_case/placeorder';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { OrderEntity } from '../domain/Entity/Order';

@Injectable()
export class OrderService {
  constructor(private placeOrder: PlaceOrderUseCase) {}

  async callPlaceOrder(order: OrderEntity) {
    const result = await this.placeOrder.execute(order);
    if (result.status == 'failure') throw new ForbiddenException();
  }
}
