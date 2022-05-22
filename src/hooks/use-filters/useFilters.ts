import { Filter, ProductEntity } from 'src/entities';
import { useState } from 'react';
import { initialFiltersSettings } from 'src/configs';
import { updateFilters, filterProducts, getActiveFilters } from './utils';

export function useFilters(products: ProductEntity[] | undefined) {
  const [filters, setFilters] = useState(initialFiltersSettings);

  const activeFilters = getActiveFilters(filters);

  const filteredProducts = Object.keys(activeFilters).length
    ? filterProducts(activeFilters, products)
    : products;

  function toggleFilter(filter: Filter) {
    const updatedFilter = {
      ...filter,
      active: !filter.active,
    };

    setFilters((prevState) => {
      return updateFilters(updatedFilter, prevState);
    });
  }

  return { filters, toggleFilter, filteredProducts };
}
