import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ProductRepository } from '@/domain/repository/ProductRepository';
import { ProductPrismaRepository } from '@/application/repository/ProductPrismaRepository';
import { InsertProductUseCase } from '@/application/use-cases/product/insert';
import { GetProductUseCase } from '@/application/use-cases/product/get';
import { GetFileUseCase } from '@/application/use-cases/file/get';
import { FileRepository } from '@/domain/repository';
import { FileRepositoryImpl } from '@/application/repository/fileRepository';
import { DeleteProductUseCase } from '@/application/use-cases/product/delete';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    InsertProductUseCase,
    GetProductUseCase,
    PrismaService,
    GetFileUseCase,
    DeleteProductUseCase,
    { provide: FileRepository, useClass: FileRepositoryImpl },
    { provide: ProductRepository, useClass: ProductPrismaRepository },
  ],
})
export class ProductModule {}
