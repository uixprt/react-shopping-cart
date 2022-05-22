import type { FC } from 'react';
import type { FiltersSettings, Filter } from 'src/entities/';
import { CheckIcon } from 'src/icons/CheckIcon';
import styles from './Filters.module.scss';

type Props = {
  filters: FiltersSettings;
  toggleFilter: (filter: Filter) => void;
};

export const Filters: FC<Props> = ({ filters, toggleFilter }) => {
  return (
    <>
      {Object.keys(filters).map((category) => (
        <div className={styles.Wrapper} key={category}>
          <div className={styles.Heading}>{category}</div>
          <ul className={styles.List}>
            {Object.values(filters[category]).map((filter) => (
              <li className={styles.Item} key={filter.code}>
                <label className={styles.CheckboxWrapper}>
                  <input
                    type="checkbox"
                    name={filter.code}
                    checked={filter.active}
                    onChange={() => toggleFilter(filter)}
                  />
                  <i className={filter.active ? styles.InputActive : ''}>
                    <CheckIcon />
                  </i>
                  <span> {filter.label} </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
