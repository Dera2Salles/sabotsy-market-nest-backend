import type { ProductEntity } from './Product';

export class FilterAndSortProductsParams {
  products: ProductEntity[];
  category: string;
  searchTerm: string;
}
