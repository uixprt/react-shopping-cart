import { Product, Cart, Spinner } from './components';
import './scss/main.scss';
import styles from './App.module.scss';
import { useProducts, useCart } from './hooks';
import { useEffect, useState } from 'react';
import { ProductEntity } from './entities';

const initialFilters = {
  price: {
    priceLowerThan100: {
      code: 'priceLowerThan100',
      label: '< 100',
      enabled: false,
    },
    priceGreaterThan200: {
      code: 'priceGreaterThan200',
      label: '> 200',
      enabled: false,
    },
  },
  rating: {
    ratingEqualTo1: {
      code: 'ratingEqualTo1',
      label: '1',
      enabled: false,
    },
    ratingEqualTo3: {
      code: 'ratingEqualTo3',
      label: '3',
      enabled: false,
    },
    ratingEqualTo5: {
      code: 'ratingEqualTo5',
      label: '5',
      enabled: false,
    },
  },
};

function updateFilters(filter: any, group: string, filters: any) {
  const updatedFilters = {
    ...filters,
    [group]: {
      ...filters[group],
      [filter.code]: filter,
    },
  };

  return updatedFilters;
}

export const App = () => {
  const { cartState, handelAddToCart, handelRemoveFromCart } = useCart();
  const { searchQuery, isLoading, error, products, handelOnSearch } =
    useProducts();
  const [filters, setFilters] = useState(initialFilters);
  const [filteredProducts, setFilteredProducts] = useState(
    [] as ProductEntity[] | undefined,
  );

  useEffect(() => {
    const enabledFilters: any = {};
    Object.keys(filters).forEach((group: any) => {
      Object.values((filters as any)[group]).forEach((filter) => {
        if ((filter as any).enabled) {
          if (!enabledFilters[group]) {
            enabledFilters[group] = [];
          }

          enabledFilters[group].push((filter as any).code);
        }
      });
    });

    console.log({ enabledFilters });
  }, [filters]);

  useEffect(() => {
    setFilteredProducts(() => products);
  }, [products]);

  if (isLoading)
    return (
      <>
        <Spinner></Spinner>
      </>
    );

  if (error) return <>Error</>;

  function handelOnFilter(e: any, filter: any, group: string) {
    e.stopPropagation();

    const updatedFilter = { ...filter, enabled: !filter.enabled };

    setFilters((prevState) => updateFilters(updatedFilter, group, prevState));
  }

  return (
    <>
      <main className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.logo}></div>
          <div className={styles.querySearch}>
            <input
              type="text"
              placeholder={'Search'}
              value={searchQuery}
              onChange={handelOnSearch}
            />
          </div>
        </header>

        <div className={styles.filtersWrapper}>
          {Object.keys(filters).map((group) => (
            <div key={group}>
              <h4 className={styles.filterCategory}>{group}</h4>
              {Object.values((filters as any)[group]).map((filter: any) => (
                <p key={filter.code}>
                  <label>
                    <input
                      type="checkbox"
                      name={filter.code}
                      checked={filter.enabled}
                      onChange={(e) => handelOnFilter(e, filter, group)}
                    />
                    <span> {filter.label} </span>
                  </label>
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.productsListWrapper}>
          {filteredProducts?.map((product) => (
            <Product
              product={product}
              item={cartState.items.get(product.id)}
              handelAddToCart={handelAddToCart}
              key={product.id}
            />
          ))}
        </div>
        <div className={styles.cartWrapper}>
          <Cart
            items={cartState.items}
            total={cartState.total}
            handleRemoveItem={handelRemoveFromCart}
          />
        </div>
      </main>
    </>
  );
};
