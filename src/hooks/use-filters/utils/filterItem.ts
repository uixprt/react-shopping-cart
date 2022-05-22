import { Filter, ProductEntity } from 'src/entities';
import { FilterOperator } from 'src/entities/filter';

export function filterItem(
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
