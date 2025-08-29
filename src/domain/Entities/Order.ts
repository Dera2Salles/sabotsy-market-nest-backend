import type { OrderStatus } from '../Types/OrderStatus';
import type { ProductEntity } from './Product';

export interface OrderEntity {
  id?: number;
  clientNumber: string;
  status: OrderStatus;
  OrderItems: ProductEntity[];
  OrderItemsTotalPrice: number;
  OrderTotalItemUnit: number;
}
