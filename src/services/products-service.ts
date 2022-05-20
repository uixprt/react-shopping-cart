import { config } from '../utils';
import type { ProductEntity } from '../entities';

export const productsService = {
  getList: async (): Promise<ProductEntity[]> =>
    (await fetch(`${config.BASE_URL}products`)).json(),
};
