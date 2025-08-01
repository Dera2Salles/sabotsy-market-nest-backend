import type { ProductEntity } from '../../domain/Entities/Product';
import type { ProductRepository } from '../../domain/repository/ProductRepository';
import type { Result } from '../../domain/Types';
import { ProductNotFoundException } from '../../domain/Exceptions';
import { failure, success } from '../../domain/Types/Result';
import { ProductModel } from '../../domain/models/Product';
import { ProductMemoryStorage } from '../database/ProductMemorySource';

export class ProductRepositoryImp implements ProductRepository {
  constructor(private readonly database: ProductMemoryStorage) {}

  insertOne(product: ProductEntity): Result<void, Error> {
    const existingProduct = this.database.products.find(
      (p) => p.name === product.name,
    );

    if (existingProduct) {
      const productModel = new ProductModel(existingProduct);
      productModel.increaseUnit(product.unit);
      const updatedProduct = productModel.snapshot();
      this.update(updatedProduct);
    } else {
      this.database.products.push(product);
    }
    return success(undefined);
  }

  insertMany(products: ProductEntity[]): Result<void, Error> {
    for (const product of products) {
      this.insertOne(product);
    }
    return success(undefined);
  }

  update(product: ProductEntity): Result<void, Error> {
    const index = this.database.products.findIndex((p) => p.id === product.id);
    if (index === -1) {
      return failure(new ProductNotFoundException());
    }
    this.database.products[index] = product;
    return success(undefined);
  }

  getAll(): Result<ProductEntity[], Error> {
    return success(this.database.products);
  }

  getOneByName(
    productName: string,
  ): Result<ProductEntity, ProductNotFoundException> {
    const product = this.database.products.find((p) => p.name === productName);
    if (!product) {
      return failure(new ProductNotFoundException());
    }
    return success(product);
  }
}
