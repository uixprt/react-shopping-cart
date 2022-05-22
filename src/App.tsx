import { Product, Cart, Spinner } from './components';
import './scss/main.scss';
import styles from './App.module.scss';
import { useProducts, useCart } from './hooks';
import { useFilters } from './hooks/use-filters/useFilters';
import type { Filter } from './hooks/use-filters/useFilters';

export const App = () => {
  const { cartState, handelAddToCart, handelRemoveFromCart } = useCart();
  const { searchQuery, isLoading, error, products, handelOnSearch } =
    useProducts();
  const { filters, toggleFilter, filteredProducts } = useFilters(products);

  if (isLoading)
    return (
      <>
        <Spinner></Spinner>
      </>
    );

  if (error) return <>Error</>;

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
          {Object.keys(filters).map((category) => (
            <div key={category}>
              <h4 className={styles.filterCategory}>{category}</h4>
              {Object.values(filters[category]).map((filter: Filter) => (
                <p key={filter.code}>
                  <label>
                    <input
                      type="checkbox"
                      name={filter.code}
                      checked={filter.active}
                      onChange={() => toggleFilter(filter)}
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
