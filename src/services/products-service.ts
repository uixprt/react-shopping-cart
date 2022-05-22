import { config } from 'src/configs';
import type { ProductEntity } from 'src/entities';

export const productsService = {
  getList: async (): Promise<ProductEntity[]> =>
    (await fetch(`${config.BASE_URL}products`)).json(),
};
