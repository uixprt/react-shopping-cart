import { useState, useEffect } from 'react';
import type { FC, CSSProperties } from 'react';
import { ProductEntity, CartItem } from '../entities';
import styles from './Product.module.scss';

type Props = {
  product: ProductEntity;
  item: CartItem | undefined;
  handelAddToCart: (product: ProductEntity, quantity: number) => void;
};

export const Product: FC<Props> = ({ product, item, handelAddToCart }) => {
  const [quantity, setQuantity] = useState(item?.quantity || 0);

  useEffect(() => {
    handelAddToCart(product, quantity);
  }, [quantity]);

  useEffect(() => {
    setQuantity(item?.quantity || 0);
  }, [item]);

  return (
    <>
      <div className={styles.productWrapper}>
        <div
          className={styles.imageBack}
          style={
            {
              [`--background-image-url`]: `url("//picsum.photos/400/100.webp?blur=2&random=${product.id}")`,
            } as CSSProperties
          }
        >
          <div className={styles.imageContainer}>
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <div className={styles.detailsWrapper}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.details}>{product.description}</p>
          <input
            min={0}
            type={'number'}
            placeholder={'Quantity'}
            value={quantity}
            onChange={(e) => {
              setQuantity(+e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
};
