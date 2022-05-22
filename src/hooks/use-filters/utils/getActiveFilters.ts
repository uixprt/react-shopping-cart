import { FiltersSettings } from 'src/entities';

export function getActiveFilters(filters: FiltersSettings): FiltersSettings {
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
