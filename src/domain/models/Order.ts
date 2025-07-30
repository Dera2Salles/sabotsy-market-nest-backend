import type { OrderEntity } from '../Entities/Order';
import type { ProductEntity } from '../Entities/Product';
import { type Result, success, failure } from '../Types/Result';

export class OrderModel {
  private order: OrderEntity | null = null;

  createOrder(): void {
    this.order = {
      status: 'Placed',
      OrderItems: [],
      OrderItemsTotalPrice: 0,
      OrderTotalItemUnit: 0,
    };
  }

  calculateTotalItemUnit(): Result<void, Error> {
    if (!this.order) {
      return failure(new Error('Order not initialized'));
    }

    this.order.OrderTotalItemUnit = this.order.OrderItems.reduce(
      (total, item) => total + item.unitOnCart,
      0,
    );
    return success(undefined);
  }

  private calculateTotal(): Result<void, Error> {
    if (!this.order) {
      return failure(new Error('Order not initialized'));
    }
    this.order.OrderItemsTotalPrice = this.order.OrderItems.reduce(
      (total, item) => total + item.price * item.unitOnCart,
      0,
    );
    return success(undefined);
  }

  addProductToTheOrder(productToAdd: ProductEntity): Result<void, Error> {
    if (!this.order) {
      return failure(new Error('Order not initialized'));
    }

    const isProductOnCart = this.order.OrderItems.findIndex(
      (item) => item.name == productToAdd.name,
    );

    if (isProductOnCart !== -1) {
      this.order.OrderItems[isProductOnCart].unitOnCart += 1;
    } else {
      productToAdd.unitOnCart = 1;
      this.order.OrderItems.push(productToAdd);
    }

    this.calculateTotalItemUnit();
    this.calculateTotal();
    return success(undefined);
  }

  decreaseProductUnitOnOrder(product: ProductEntity): Result<void, Error> {
    if (!this.order) {
      return failure(new Error('Order not initialized'));
    }

    const isProductOnCart = this.order.OrderItems.findIndex(
      (item) => item.name == product.name,
    );

    if (isProductOnCart !== -1) {
      let productUnitOnOrder =
        this.order.OrderItems[isProductOnCart].unitOnCart;

      if (productUnitOnOrder != 0) productUnitOnOrder -= 1;

      this.calculateTotal();

      return success(undefined);
    }
    product.unitOnCart = 1;
    this.order.OrderItems.push(product);

    this.calculateTotal();
    return success(undefined);
  }

  removeProductToTheOrder(productId: number): Result<void, Error> {
    if (!this.order) {
      return failure(new Error('Order not initialized'));
    }
    const initialLength = this.order.OrderItems.length;
    this.order.OrderItems = this.order.OrderItems.filter(
      (item) => item.id !== productId,
    );

    if (this.order.OrderItems.length === initialLength) {
      return failure(new Error('Product not found in order'));
    }

    this.calculateTotal();
    return success(undefined);
  }

  getData(): Result<OrderEntity, Error> {
    if (!this.order) {
      return failure(new Error('Order not initialized'));
    }
    return success({
      ...this.order,
    });
  }

  verifyIsPlaced = (): Result<void, Error> => {
    const isOrderCreated = this.order;
    if (!isOrderCreated) return failure(new Error('Order not initialized'));
    return success(undefined);
  };
}
