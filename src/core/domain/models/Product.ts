import type { ProductEntity } from '../Entities/Product';
import { ProductOutOfStockException } from '../Exceptions';

export class ProductModel {
  private product: ProductEntity;

  constructor(product: ProductEntity) {
    this.product = product;
  }

  increaseUnit(unit: number) {
    this.product.unit += unit;
  }

  decreaseUnit(unit: number) {
    if (this.product.unit < unit) throw new ProductOutOfStockException();
    this.product.unit -= unit;
  }

  update(productUpdate: ProductEntity) {
    if (
      productUpdate.price != null ||
      productUpdate.unit != null ||
      productUpdate.name != null
    ) {
      this.product.price = productUpdate.price;
      this.product.unit = productUpdate.unit;
      this.product.name = productUpdate.name;
    }
  }

  snapshot(): ProductEntity {
    return {
      ...this.product,
    };
  }
}
