import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { ProductEntity } from '../entities';
import { productsService } from '../services';
import Fuse from 'fuse.js';

export function useProducts() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data, isLoading, error } = useQuery<ProductEntity[]>(
    'products',
    productsService.getList,
  );

  const fuse = data ? new Fuse(data, { keys: ['title', 'description'] }) : null;

  const products = searchQuery
    ? fuse?.search(searchQuery).map((res) => res.item)
    : data;

  function handelOnSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.currentTarget.value);
  }

  return {
    searchQuery,
    isLoading,
    error,
    products,
    handelOnSearch,
  };
}
