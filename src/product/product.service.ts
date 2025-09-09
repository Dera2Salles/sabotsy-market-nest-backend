import { GetFileUseCase } from '@/application/use-cases/file/get';
import { DeleteProductUseCase } from '@/application/use-cases/product/delete';
import { GetProductUseCase } from '@/application/use-cases/product/get';
import { InsertProductUseCase } from '@/application/use-cases/product/insert';
import { ProductEntity } from '@/domain/Entities/Product';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    private insertProduct: InsertProductUseCase,
    private getProduct: GetProductUseCase,
    private getFile: GetFileUseCase,
    private deleteProduct: DeleteProductUseCase,
  ) {}

  async callInsertProduct(product: ProductEntity[]) {
    const result = await this.insertProduct.exexute(product);
    if (result.status == 'failure') throw new ForbiddenException();
  }

  async callGetProduct(page: number, limit: number) {
    const result = await this.getProduct.exexute(page, limit);
    if (result.status == 'failure') throw new ForbiddenException();
    return result;
  }

  async callGetFile(fileName: string) {
    const result = await this.getFile.exexute(fileName);
    if (result.status == 'failure') throw new ForbiddenException();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { mimeType: result.data.mimetype, stream: result.data.file };
  }

  async callDelete(productId: string) {
    const result = await this.deleteProduct.exexute(productId);
    if (result.status == 'failure') throw new ForbiddenException();
  }
}
