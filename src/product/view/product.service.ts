import { GetFileUseCase } from '@/file/application/use_case/get';
import { DeleteProductUseCase } from '@/product/application/use_case/delete';
import { GetProductUseCase } from '@/product/application/use_case/get';
import { InsertProductUseCase } from '@/product/application/use_case/insert';
import { ProductEntity } from '@/product/domain/Entitie/Product';
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
    return result.data;
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
