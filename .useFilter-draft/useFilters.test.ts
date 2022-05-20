import type {Filter, FiltersSettings} from './useFilters';
import {
  FilterCategory,
  FilterKey,
  FilterOperator,
  initialFiltersSettings,
  updateFilters,
} from './useFilters';
import { data } from './data';
import { ProductEntity } from '../src/entities';

// function createConditionFromFilters(filters: FiltersSettings): string | null {
//   return Object.values(filters).reduce((condition, filterArr) => {
//     const filterString = filterArr.reduce((condition: any, filter) => {
//       if (filter.enabled) {
//         if (condition) {
//           return `${condition} || ${filter.condition}`;
//         }
//         return filter.condition;
//       }
//     }, null);
//     if (condition) {
//       return `${condition} && ${filterString}`;
//     }
//     return filterString;
//   }, null);
// }

function filterProducts(filters: FiltersSettings, products: ProductEntity[]) {
  Object.values(filters).forEach((filterCategory) => {
    filterCategory.forEach(({ key, operator, value, enabled }) => {
      let filterCategoryResults: ProductEntity[] = [];
      if (enabled) {
        const filterProductsByFilter = (item: ProductEntity) => {
          switch (operator) {
            case FilterOperator.Equal:
              return (item as any)[key] === value;
            case FilterOperator.LowerThan:
              return (item as any)[key] < value;
            case FilterOperator.GreaterThan:
              return (item as any)[key] > value;
          }
        };

        filterCategoryResults.push(...products.filter(filterProductsByFilter));
      }
      const a = filterCategoryResults.map((item) => ({
        rating: (item as any).rateFloored,
        price: item.price,
      }));
      a.length ? console.log({ a }) : null;
    });
  });
}

test('should createConditionFromFilters return correct condition string after updating filters from different group', () => {
  const filters1 = initialFiltersSettings;

  const filters2 = updateFilters(
    {
      label: `< 100$`,
      operator: FilterOperator.LowerThan,
      enabled: true,
      key: FilterKey.Price,
      value: 100,
      category: FilterCategory.Price,
    } as Filter,
    filters1,
  );

  const filters3 = updateFilters(
    {
      label: '1',
      operator: FilterOperator.Equal,
      enabled: true,
      key: FilterKey.Rating,
      value: 1,
      category: FilterCategory.Rating,
    } as Filter,
    filters2,
  );

  const filters4 = updateFilters(
    {
      label: '3',
      operator: FilterOperator.Equal,
      enabled: true,
      key: FilterKey.Rating,
      value: 3,
      category: FilterCategory.Rating,
    } as Filter,
    filters3,
  );

  console.log({ filters4 });

  const products = data.map((item) => {
    const rateFloored = Math.floor(item.rating.rate);
    return {
      ...item,
      rateFloored,
    };
  });
  const filteredProducts = filterProducts(filters4, products);

  expect(filteredProducts).toBe([]);
});
