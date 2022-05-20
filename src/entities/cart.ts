import { CartItem } from './cart-item';

export interface Cart {
  items: Map<number, CartItem>;
  total: number;
}
