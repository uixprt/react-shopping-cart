import { BaseEntity } from './base-entity';

export interface CartItem extends BaseEntity {
  quantity: number;
}
