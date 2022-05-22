import { Filter, FiltersSettings } from 'src/entities/filter-settings';

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
