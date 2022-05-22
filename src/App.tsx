import { Filters, Product, Cart, Spinner } from './components';
import './scss/main.scss';
import styles from './App.module.scss';
import { useProducts, useCart } from './hooks';
import { useFilters } from './hooks/use-filters/useFilters';
import { SearchIcon } from './icons/SearchIcon';

export const App = () => {
  const { cartState, handelAddToCart, handelRemoveFromCart } = useCart();
  const { searchQuery, isLoading, error, products, handelOnSearch } =
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
              value={searchQuery}
              onChange={handelOnSearch}
            />
          </div>
        </header>
        <div className={styles.filtersWrapper}>
          <Filters filters={filters} toggleFilter={toggleFilter} />
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
