import { BaseEntity } from './base-entity';

export interface CartItem extends BaseEntity {
  title: string;
  quantity: number;
  total: number;
}
