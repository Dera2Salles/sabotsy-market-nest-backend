import { Injectable } from '@nestjs/common';
import { CreateAnOrder } from './createAnOrder';

@Injectable()
export class GetOrder {
  constructor(private createOrder: CreateAnOrder) {}

  execute() {
    const order = this.createOrder.execute();
    const result = order.getData();
    if (result.status === 'failure') throw new Error();
    return result.data.OrderItems;
  }
}
