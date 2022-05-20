import { ProductEntity } from '../src/entities';
import { useEffect, useState } from 'react';

export enum FilterCategory {
  Price = 'price',
  Rating = 'rating',
}

export enum FilterKey {
  Price = 'price',
  Rating = 'rateFloored',
}

export enum FilterOperator {
  GreaterThan = 'greaterThan',
  LowerThan = 'lowerThan',
  Equal = 'equal',
  Or = 'or',
  And = 'and',
}

export type Condition = (item: ProductEntity) => boolean;

export interface Filter {
  category: FilterCategory;
  label: string;
  enabled: boolean;
  key: FilterKey;
  operator: FilterOperator;
  value: number | string;
}

export type FiltersSettings = Record<string, Filter[]>;

export const initialFiltersSettings: FiltersSettings = {
  price: [
    {
      label: `< 100$`,
      operator: FilterOperator.LowerThan,
      enabled: false,
      key: FilterKey.Price,
      value: 100,
      category: FilterCategory.Price,
    },
    {
      label: `> 200$`,
      operator: FilterOperator.GreaterThan,
      enabled: false,
      key: FilterKey.Price,
      value: 200,
      category: FilterCategory.Price,
    },
  ],
  rating: [
    {
      label: '1',
      operator: FilterOperator.Equal,
      enabled: false,
      key: FilterKey.Rating,
      value: 1,
      category: FilterCategory.Rating,
    },
    {
      label: '2',
      operator: FilterOperator.Equal,
      enabled: false,
      key: FilterKey.Rating,
      value: 2,
      category: FilterCategory.Rating,
    },
    {
      label: '3',
      operator: FilterOperator.Equal,
      enabled: false,
      key: FilterKey.Rating,
      value: 3,

      category: FilterCategory.Rating,
    },
  ],
};

export function updateFilters(filter: Filter, filters: FiltersSettings) {
  const filterArray = [
    ...filters[filter.category].filter((f) => f.label !== filter.label),
    filter,
  ];

  return {
    ...filters,
    [filter.category]: filterArray,
  };
}

export function useFilters(
  products: ProductEntity[],
  setProducts: (prevState: ProductEntity[]) => ProductEntity[],
) {
  const [filters, setFilters] = useState(initialFiltersSettings);

  function handleSetFilter(filter: Filter) {
    setFilters((prevState) => {
      return updateFilters(filter, prevState);
    });
  }

  useEffect(() => {}, [filters, products]);
}
