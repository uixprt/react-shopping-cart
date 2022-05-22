import { ProductEntity } from '../../entities';
import { useEffect, useState } from 'react';

export enum FilterCategory {
  Price = 'price',
  Rating = 'rating',
}

export enum FilterKey {
  Price = 'price',
  Rating = 'rating',
  Rate = 'rate',
}

export enum FilterCode {
  PriceLte100 = 'priceLte100',
  PriceGte200 = 'priceGte200',
  RateEt1 = 'rateEt1',
  RateEt3 = 'rateEt3',
  RateEt5 = 'rateEt5',
}

export enum FilterOperator {
  GreaterThan = 'greaterThan',
  LowerThan = 'lowerThan',
  Equal = 'equal',
}

export interface Filter {
  code: FilterCode;
  category: FilterCategory;
  label: string;
  active: boolean;
  key: FilterKey;
  nestedKey?: FilterKey;
  operator: FilterOperator;
  value: number | string;
}

export type FiltersSettings = Record<string, Record<string, Filter>>;

export const initialFiltersSettings: FiltersSettings = {
  price: {
    priceLte100: {
      code: FilterCode.PriceLte100,
      label: `< 100$`,
      operator: FilterOperator.LowerThan,
      active: false,
      key: FilterKey.Price,
      value: 100,
      category: FilterCategory.Price,
    },
    priceGte200: {
      code: FilterCode.PriceGte200,
      label: `> 200$`,
      operator: FilterOperator.GreaterThan,
      active: false,
      key: FilterKey.Price,
      value: 200,
      category: FilterCategory.Price,
    },
  },
  rating: {
    rateEt1: {
      code: FilterCode.RateEt1,
      label: '1',
      operator: FilterOperator.Equal,
      active: false,
      key: FilterKey.Rating,
      nestedKey: FilterKey.Rate,
      value: 1,
      category: FilterCategory.Rating,
    },
    rateEt3: {
      code: FilterCode.RateEt3,
      label: '3',
      operator: FilterOperator.Equal,
      active: false,
      key: FilterKey.Rating,
      nestedKey: FilterKey.Rate,
      value: 3,
      category: FilterCategory.Rating,
    },
    rateEt5: {
      code: FilterCode.RateEt5,
      label: '5',
      operator: FilterOperator.Equal,
      active: false,
      key: FilterKey.Rating,
      nestedKey: FilterKey.Rate,
      value: 5,
      category: FilterCategory.Rating,
    },
  },
};

export function updateFilters(
  filter: Filter | Pick<Filter, 'code' | 'category' | 'active'>,
  filters: FiltersSettings,
) {
  return {
    ...filters,
    [filter.category]: {
      ...filters[filter.category],
      [filter.code]: { ...filters[filter.category][filter.code], ...filter },
    },
  };
}

function filterItem(
  { operator, key, nestedKey, value }: Filter,
  item: ProductEntity,
): boolean {
  const filteredItem = nestedKey
    ? (item as any)[key][nestedKey]
    : (item as any)[key];
  switch (operator) {
    case FilterOperator.Equal:
      return Math.round(filteredItem) === value;
    case FilterOperator.LowerThan:
      return filteredItem < value;
    case FilterOperator.GreaterThan:
      return filteredItem > value;
    default:
      return true;
  }
}

function getActiveFilters(filters: FiltersSettings): FiltersSettings {
  return Object.keys(filters).reduce((acc, filterCategory) => {
    const categoryFilters = Object.values(filters[filterCategory]).reduce(
      (acc, filter) => {
        if (filter.active) {
          if (!acc[filterCategory]) {
            acc[filterCategory] = {};
          }
          acc[filterCategory][filter.code] = filter;
        }
        return acc;
      },
      {} as FiltersSettings,
    );
    return { ...acc, ...categoryFilters };
  }, {} as FiltersSettings);
}

export function filterProducts(
  filters: FiltersSettings,
  products: ProductEntity[] | undefined,
) {
  const activeFilters = getActiveFilters(filters);

  if (!Object.keys(activeFilters).length) {
    return products;
  }

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

export function useFilters(products: ProductEntity[] | undefined) {
  const [filters, setFilters] = useState(initialFiltersSettings);
  const [filteredProducts, setFilteredProducts] = useState(products);

  function toggleFilter(filter: Filter) {
    const updatedFilter = {
      ...filter,
      active: !filter.active,
    };

    setFilters((prevState) => {
      return updateFilters(updatedFilter, prevState);
    });
  }

  useEffect(() => {
    setFilteredProducts(() => filterProducts(filters, products));
  }, [filters, products]);

  return { filters, toggleFilter, filteredProducts };
}
