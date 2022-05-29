import type { FC, CSSProperties, ChangeEvent } from 'react';
import { ProductEntity, CartItem } from '../entities';
import styles from './Product.module.scss';
import { toMonetaryText } from '../utils';
import { Rate } from './Rate';
import { backgroundImagesList } from 'src/configs';

type Props = {
  product: ProductEntity;
  item: CartItem | undefined;
  onChangeQuantity: (id: number, quantity: number) => void;
};

export const Product: FC<Props> = ({ product, item, onChangeQuantity }) => {
  function changeQuantity(e: ChangeEvent<HTMLInputElement>) {
    const updateValue = Number(e.target.value);
    if (updateValue === item?.quantity) return;
    onChangeQuantity(product.id, updateValue);
  }

  return (
    <>
      <div className={styles.productWrapper} key={product.id}>
        <div
          className={styles.imageBack}
          style={
            {
              [`--background-image-url`]: `url("${
                backgroundImagesList[product.id - 1]
              }")`,
            } as CSSProperties
          }
        >
          <div className={styles.imageContainer}>
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.priceRow}>
            <div className={styles.rating}>
              <Rate rate={product.rating.rate}></Rate>
            </div>
            <b className={styles.price}>{toMonetaryText(product.price, '$')}</b>
          </div>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.details}>{product.description}</p>
          <input
            min={0}
            type={'number'}
            placeholder={'Quantity'}
            value={item?.quantity || ''}
            onChange={changeQuantity}
          />
        </div>
      </div>
    </>
  );
};
