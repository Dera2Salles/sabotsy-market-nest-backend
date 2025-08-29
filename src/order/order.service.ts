import { PlaceOrderUseCase } from '@/application/use-cases/Order/placeorder';
import { OrderEntity } from '@/domain/Entities/Order';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private placeOrder: PlaceOrderUseCase) {}

  async callPlaceOrder(order: OrderEntity) {
    const result = await this.placeOrder.execute(order);
    if (result.status == 'failure') throw new ForbiddenException();
  }
}
