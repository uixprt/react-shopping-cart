import type { FiltersSettings } from 'src/entities/filter-settings';
import {
  FilterCode,
  FilterOperator,
  FilterKey,
  FilterCategory,
} from '../entities/filter';

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
