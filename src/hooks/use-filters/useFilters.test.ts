import { FilterCode, FilterCategory } from 'src/entities/filter';
import { initialFiltersSettings } from 'src/configs';
import { updateFilters, filterProducts } from './utils';

import { testData } from './testData';

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

  const expected1 = testData;
  const filteredProducts1 = filterProducts(filters1, testData);
  expect(filteredProducts1).toEqual(expected1);

  const expected2 = testData.filter((item) => item.price > 200);
  const filteredProducts2 = filterProducts(filters2, testData);
  expect(filteredProducts2).toEqual(expected2);

  const expected3 = testData.filter(
    (item) => 1 === Math.round(item.rating.rate) && item.price > 200,
  );
  const filteredProducts3 = filterProducts(filters3, testData);
  expect(filteredProducts3).toEqual(expected3);

  const expected4 = testData.filter(
    (item) =>
      (3 === Math.round(item.rating.rate) ||
        1 === Math.round(item.rating.rate)) &&
      item.price > 200,
  );
  const filteredProducts4 = filterProducts(filters4, testData);
  expect(filteredProducts4).toEqual(expected4);

  const expected5 = testData.filter(
    (item) =>
      (5 === Math.round(item.rating.rate) ||
        3 === Math.round(item.rating.rate) ||
        1 === Math.round(item.rating.rate)) &&
      item.price > 200,
  );
  const filteredProducts5 = filterProducts(filters5, testData);
  expect(filteredProducts5).toEqual(expected5);

  const expected6 = testData.filter(
    (item) =>
      (5 === Math.round(item.rating.rate) ||
        3 === Math.round(item.rating.rate) ||
        1 === Math.round(item.rating.rate)) &&
      (item.price > 200 || item.price < 100),
  );
  const filteredProducts6 = filterProducts(filters6, testData);
  expect(filteredProducts6).toEqual(expected6);
});
