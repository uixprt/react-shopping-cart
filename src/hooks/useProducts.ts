import { ChangeEvent, useState, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { ProductEntity } from '../entities';
import { productsService } from '../services';
import Fuse from 'fuse.js';
import _ from 'lodash';

export function useProducts() {
  const { data, isLoading, error } = useQuery<ProductEntity[]>(
    'products',
    productsService.getList,
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  const [products, setProducts] = useState<ProductEntity[] | undefined>([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const fuse = useMemo(
    () => (data ? new Fuse(data, { keys: ['title', 'description'] }) : null),
    [data],
  );

  const productsMap = useMemo(
    () =>
      (products as ProductEntity[])?.reduce(
        (acc, product) => acc.set(product.id, product),
        new Map<number, ProductEntity>(),
      ),
    [products],
  );

  const filterProducts = _.debounce((query) => {
    if (!query) return setProducts(data);

    setProducts(() => fuse?.search(query).map((res) => res.item));
  }, 400);

  function onFilterProducts(e: ChangeEvent<HTMLInputElement>) {
    filterProducts(e.currentTarget.value);
  }

  return {
    isLoading,
    error,
    productsMap,
    products,
    onFilterProducts,
  };
}
