import type {FC} from 'react';
import styles from './Cart.module.scss';
import {CartEntity, ProductEntity} from '../entities';
import {toMonetaryText} from '../utils';

type Props = {
  productsMap: Map<number, ProductEntity>;
  cart: CartEntity;
  onRemoveItem: (id: number) => void;
};

function calcItemTotal(product: ProductEntity, quantity: number) {
  return (product?.price || 0) * quantity;
}

function calcTotal(
  productsMap: Map<number, ProductEntity>,
  cart: CartEntity,
): number {
  return [...cart].reduce((acc, [id, item]) => {
    return (
      acc + calcItemTotal(productsMap.get(id) as ProductEntity, item.quantity)
    );
  }, 0);
}

export const Cart: FC<Props> = ({productsMap, cart, onRemoveItem}) => {
  const total = calcTotal(productsMap, cart);
  
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.heading}>Cart</div>
        <div className={styles.body}>
          {total > 0 ? (
            <>
              {[...cart].map(([id, item]) =>
                item.quantity > 0 ? (
                  <div className={styles.item} key={id}>
                    <span className={styles.title}>
                      {(productsMap.get(id) as ProductEntity)?.title || ''}
                    </span>
                    <span className={styles.quantity}>X {item.quantity}</span>
                    <b className={styles.total}>
                      {toMonetaryText(
                        calcItemTotal(
                          productsMap.get(id) as ProductEntity,
                          item.quantity,
                        ),
                        '$',
                      )}
                    </b>
                    <button
                      className={styles.removeButton}
                      onClick={() => onRemoveItem(id)}
                    >
                      X
                    </button>
                  </div>
                ) : null,
              )}
              <div className={styles.footer}>
                <b className={styles.cartTotal}>{toMonetaryText(total, '$')}</b>
              </div>
            </>
          ) : (
            <div className={styles.cartEmpty}>No items on your Cart :(</div>
          )}
        </div>
      </div>
    </>
  );
};
