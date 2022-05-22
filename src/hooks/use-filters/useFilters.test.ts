import {
  FilterCode,
  FilterCategory,
  initialFiltersSettings,
  updateFilters,
  filterProducts,
} from './useFilters';
import { data } from './data';

test('should filterProducts return correct productList for each filter combination', () => {
  const filters1 = initialFiltersSettings;

  const filters2 = updateFilters(
    {
      code: FilterCode.PriceGte200,
      active: true,
      category: FilterCategory.Price,
    },
    filters1,
  );

  const filters3 = updateFilters(
    {
      code: FilterCode.RateEt1,
      active: true,
      category: FilterCategory.Rating,
    },
    filters2,
  );

  const filters4 = updateFilters(
    {
      code: FilterCode.RateEt3,
      active: true,
      category: FilterCategory.Rating,
    },
    filters3,
  );

  const filters5 = updateFilters(
    {
      code: FilterCode.RateEt5,
      active: true,
      category: FilterCategory.Rating,
    },
    filters4,
  );

  const filters6 = updateFilters(
    {
      code: FilterCode.PriceLte100,
      active: true,
      category: FilterCategory.Price,
    },
    filters5,
  );

  const expected1 = data;
  const filteredProducts1 = filterProducts(filters1, data);
  expect(filteredProducts1).toEqual(expected1);

  const expected2 = data.filter((item) => item.price > 200);
  const filteredProducts2 = filterProducts(filters2, data);
  expect(filteredProducts2).toEqual(expected2);

  const expected3 = data.filter(
    (item) => 1 === Math.round(item.rating.rate) && item.price > 200,
  );
  const filteredProducts3 = filterProducts(filters3, data);
  expect(filteredProducts3).toEqual(expected3);

  const expected4 = data.filter(
    (item) =>
      (3 === Math.round(item.rating.rate) ||
        1 === Math.round(item.rating.rate)) &&
      item.price > 200,
  );
  const filteredProducts4 = filterProducts(filters4, data);
  expect(filteredProducts4).toEqual(expected4);

  const expected5 = data.filter(
    (item) =>
      (5 === Math.round(item.rating.rate) ||
        3 === Math.round(item.rating.rate) ||
        1 === Math.round(item.rating.rate)) &&
      item.price > 200,
  );
  const filteredProducts5 = filterProducts(filters5, data);
  expect(filteredProducts5).toEqual(expected5);

  const expected6 = data.filter(
    (item) =>
      (5 === Math.round(item.rating.rate) ||
        3 === Math.round(item.rating.rate) ||
        1 === Math.round(item.rating.rate)) &&
      (item.price > 200 || item.price < 100),
  );
  const filteredProducts6 = filterProducts(filters6, data);
  expect(filteredProducts6).toEqual(expected6);
});
