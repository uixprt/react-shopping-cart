import { FiltersSettings, ProductEntity } from 'src/entities';
import { filterItem } from './filterItem';

export function filterProducts(
  activeFilters: FiltersSettings,
  products: ProductEntity[] | undefined,
) {
  const filteredProducts: ProductEntity[][] = [[]];
  products?.forEach((item) => {
    Object.keys(activeFilters).forEach((category, index) => {
      // first categories of filters
      if (index === 0) {
        Object.values(activeFilters[category]).forEach((filter) => {
          const a = filterItem(filter, item);

          if (a) {
            filteredProducts[0].push(item);
          }
        });
      }
      // second and above categories of filters
      if (index > 0) {
        filteredProducts[index] = [];
        filteredProducts[index - 1].forEach((item) => {
          Object.values(activeFilters[category]).forEach((filter) => {
            const a = filterItem(filter, item);

            if (a) {
              filteredProducts[index].push(item);
            }
          });
        });
      }
    });
  });

  return filteredProducts[filteredProducts.length - 1];
}
