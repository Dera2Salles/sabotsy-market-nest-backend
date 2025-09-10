import { ProductEntity } from '@/product/domain/Entitie/Product';

export interface UserData {
  name: string;
  product: ProductEntity[];
  productTotalNumber: number;
  productOnOrderTotalNumber: number;
}
