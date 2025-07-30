import type { ProductEntity } from '../../domain/Entities/Product';

export class ProductMemoryStorage {
  public products: ProductEntity[] = [
    {
      id: 1,
      producerId: 101,
      price: 2.5,
      unit: 50,
      unitOnCart: 0,
      name: 'Pommes Gala',
      category: 'Fruits',
      image: 'src/assets/apple.jpg',
    },
    {
      id: 2,
      producerId: 101,
      price: 1.8,
      unit: 100,
      unitOnCart: 0,
      name: 'Carottes Fraîches',
      category: 'Légumes',
      image: 'src/assets/carrot.jpg',
    },
    {
      id: 3,
      producerId: 102,
      price: 4.0,
      unit: 30,
      unitOnCart: 0,
      name: 'Pain de Campagne',
      category: 'Boulangerie',
      image: 'src/assets/bread.jpg',
    },
    {
      id: 4,
      producerId: 103,
      price: 8.5,
      unit: 20,
      unitOnCart: 0,
      name: 'Fromage de Chèvre',
      category: 'Produits Laitiers',
      image: 'src/assets/cheese.jpg',
    },
    {
      id: 5,
      producerId: 102,
      price: 12.0,
      unit: 40,
      unitOnCart: 0,
      name: 'Miel de Forêt',
      category: 'Épicerie',
      image: 'src/assets/honey.jpg',
    },
  ];
}
