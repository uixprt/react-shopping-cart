import { Filters, Product, Cart, Spinner } from './components';
import './scss/main.scss';
import styles from './App.module.scss';
import { useProducts, useCart } from './hooks';
import { useFilters } from './hooks/use-filters/useFilters';
import { SearchIcon } from './icons/SearchIcon';

export const App = () => {
  const { cart, changeQuantity, removeItem } = useCart();
  const { isLoading, error, productsMap, products, onFilterProducts } =
    useProducts();
  const { filters, toggleFilter, filteredProducts } = useFilters(products);
  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  if (error) return <>Error</>;

  return (
    <>
      <main className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.logo}></div>
          <div className={styles.querySearch}>
            <SearchIcon />
            <input
              type="text"
              placeholder={'Search'}
              onChange={onFilterProducts}
            />
          </div>
        </header>
        <div className={styles.filtersWrapper}>
          <Filters filters={filters} toggleFilter={toggleFilter} />
        </div>
        <div className={styles.productsListWrapper}>
          {filteredProducts?.length ? (
            filteredProducts.map((product) => (
              <Product
                product={product}
                item={cart.get(product.id)}
                onChangeQuantity={changeQuantity}
                key={product.id}
              />
            ))
          ) : (
            <div className={styles.noProductsResults}>
              No Products matches to your filters... :(
            </div>
          )}
        </div>
        <div className={styles.cartWrapper}>
          {productsMap ? (
            <Cart
              productsMap={productsMap}
              cart={cart}
              onRemoveItem={removeItem}
            />
          ) : null}
        </div>
      </main>
    </>
  );
};
