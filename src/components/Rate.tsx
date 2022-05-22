import type { FC } from 'react';
import styles from './Rate.module.scss';
import { StarIcon } from '../icons/StarIcon';

type Props = {
  rate: number;
};

const Star = (rate: number, index: number) => {
  const full = index + 1 <= Math.floor(rate);
  const empty = index + 1 > Math.ceil(rate);

  const className = full ? styles.Full : empty ? styles.Empty : styles.Partly;
  return (
    <div key={index} className={className}>
      <StarIcon />
    </div>
  );
};

const Stars = (rate: number) =>
  Array(5)
    .fill(5)
    .map((star, index) => Star(rate, index));

export const Rate: FC<Props> = ({ rate }) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Stars}>{Stars(rate)}</div>({rate})
    </div>
  );
};
