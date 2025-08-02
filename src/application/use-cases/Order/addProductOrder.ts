import type { ProductEntity } from '@/domain/Entities/Product';
import { failure, Result, success } from '@/domain/Types';
import { OrderEntity } from '@/domain/Entities';
import { CreateAnOrder } from './createAnOrder';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddProductToTheOrderUseCase {
  constructor(private createAnOrder: CreateAnOrder) {}

  execute(product: ProductEntity): Result<OrderEntity, Error> {
    const order = this.createAnOrder.execute();
    const result = order.addProductToTheOrder(product);
    if (result.status === 'failure') return failure(result.error);
    const resultOrder = order.getData();
    if (resultOrder.status === 'failure') return failure(resultOrder.error);
    return success(resultOrder.data);
  }
}
