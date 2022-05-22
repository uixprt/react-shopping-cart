import {
  FilterCode,
  FilterCategory,
  FilterKey,
  FilterOperator,
} from './filter';

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

export type FiltersCategoryEntity = Record<string, Filter>;

export type FiltersSettings = Record<string, FiltersCategoryEntity>;
