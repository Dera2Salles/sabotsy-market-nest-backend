import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ProductRepository } from '@/product/domain/repository/ProductRepository';
import { ProductPrismaRepository } from '@/product/application/ProductPrismaRepository';
import { InsertProductUseCase } from '@/product/application/use_case/insert';
import { GetProductUseCase } from '@/product/application/use_case/get';
import { GetFileUseCase } from '@/file/application/use_case/get';
import { FileRepositoryImpl } from '@/file/application/fileRepository';
import { DeleteProductUseCase } from '@/product/application/use_case/delete';
import { FileRepository } from '@/file/domain/repository/fileRepository';

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
