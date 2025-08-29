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
      await this.prisma.product.createMany({
        data: product.map((item) => ({
          name: item.name,
          category: item.category,
          description: item.description,
          price: item.price,
          producerId: item.producerId,
        })),
      });

      return success(undefined);
    } catch (error) {
      console.error(error);
      return failure(Error());
    }
  }
}
