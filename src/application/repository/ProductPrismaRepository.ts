import { ProductEntity } from '@/domain/Entities/Product';
import { ProductRepository } from '@/domain/repository/ProductRepository';
import { RESULT } from '@/domain/Types';
import { failure, success } from '@/domain/Types/Result';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async insertMany(product: ProductEntity[]): Promise<RESULT<void, Error>> {
    try {
      const productExisting = await this.prisma.product.findMany({
        where: {
          OR: product.map((item) => ({
            producerId: item.producerId,
            name: item.name.toUpperCase(),
          })),
        },
        select: { producerId: true, name: true, id: true, unit: true },
      });

      const productToInsert = product.filter(
        (product) =>
          !productExisting.some(
            (existing) => existing.name === product.name.toUpperCase(),
          ),
      );

      if (productExisting.length > 0) {
        await Promise.all(
          productExisting.map(async (existingProduct) => {
            const matchProduct = product.find(
              (item) => item.name.toUpperCase() === existingProduct.name,
            );

            if (matchProduct) {
              await this.prisma.product.update({
                where: { id: existingProduct.id },
                data: {
                  unit: {
                    increment: matchProduct.unit,
                  },
                },
              });
            }
          }),
        );
      }
      if (productToInsert.length > 0) {
        await this.prisma.product.createMany({
          data: productToInsert.map((item) => ({
            name: item.name.toUpperCase(),
            category: item.category,
            description: item.description,
            price: item.price,
            producerId: item.producerId,
            unit: item.unit,
            filename: item.filename,
          })),
        });
      }

      return success(undefined);
    } catch (error) {
      console.error(error);
      return failure(Error());
    }
  }

  async getAll(
    page: number,
    limit: number,
  ): Promise<RESULT<ProductEntity[], Error>> {
    try {
      const result = await this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });
      const products: ProductEntity[] = result.map((item) => ({
        id: item.id,
        category: item.category,
        description: item.description,
        filename: item.filename as string,
        name: item.name,
        price: item.price,
        producerId: item.producerId,
        unit: item.unit,
      }));

      return success(products);
    } catch (error) {
      console.error(error);
      return failure(Error());
    }
  }
}
