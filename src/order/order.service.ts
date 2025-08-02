import { AddProductToTheOrderUseCase } from '@/application/use-cases/Order/addProductOrder';
import { GetOrder } from '@/application/use-cases/Order/getOrder';
import { ProductEntity } from '@/domain/Entities';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    private addProduct: AddProductToTheOrderUseCase,
    private getOrder: GetOrder,
  ) {}

  addProductService(product: ProductEntity) {
    const result = this.addProduct.execute(product);
    if (result.status == 'failure') throw new ForbiddenException(result.status);
    return { data: result.data };
  }

  getOrderService() {
    const result = this.getOrder.execute();
    return { data: result };
  }
}
