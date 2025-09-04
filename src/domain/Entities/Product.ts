export interface ProductEntity {
  id: string;
  producerId: string;
  price: number;
  unit: number;
  unitOnCart?: number;
  name: string;
  category: string;
  description: string;
  filename: string;
}
