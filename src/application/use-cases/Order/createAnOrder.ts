import { OrderModel } from '@/domain/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAnOrder {
  private currentOrder: OrderModel = new OrderModel();

  execute() {
    return this.currentOrder;
  }
}
