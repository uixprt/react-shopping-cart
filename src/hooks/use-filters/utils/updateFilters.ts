import { Filter, FiltersSettings } from 'src/entities/filter-settings';

export function updateFilters(
  {
    code,
    category,
    active,
  }: Filter | Pick<Filter, 'code' | 'category' | 'active'>,
  filters: FiltersSettings,
) {
  return {
    ...filters,
    [category]: {
      ...filters[category],
      [code]: { ...filters[category][code], active },
    },
  };
}
