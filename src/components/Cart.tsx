import type { FC } from 'react';
import styles from './Cart.module.scss';
import { CartItem } from '../entities';
import { toMonetaryText } from '../utils';

type Props = {
  items: Map<number, CartItem>;
  total: number;
  handleRemoveItem: (item: CartItem) => void;
};

export const Cart: FC<Props> = ({ items, total, handleRemoveItem }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.heading}>Cart</div>
        <div className={styles.body}>
          {total > 0 ? (
            <>
              {[...items].map(([id, item]) =>
                item.quantity > 0 ? (
                  <div className={styles.item} key={id}>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.quantity}>X {item.quantity}</span>
                    <b className={styles.total}>
                      {toMonetaryText(item.total, '$')}
                    </b>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveItem(item)}
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
