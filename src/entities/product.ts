import type { BaseEntity } from './base-entity';
import type { Rating } from './rating';

export interface Product extends  BaseEntity{
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}
