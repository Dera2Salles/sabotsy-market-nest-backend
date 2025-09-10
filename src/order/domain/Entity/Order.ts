import { ProductEntity } from '@/product/domain/Entitie/Product';
import { OrderStatus } from './OrderStatus';

export interface OrderEntity {
  id?: number;
  consumerId: string;
  status: OrderStatus;
  OrderItems: ProductEntity[];
  OrderItemsTotalPrice: number;
  OrderTotalItemUnit: number;
}
