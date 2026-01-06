import { getUniqueValuesByKey } from '@/utils/helper';
import { data } from '@/data';
import styles from './filterItem.module.css';

type FilterItemProps = {
  type: 'author' | 'release_date' | 'genre';
};

export function FilterItem({ type }: FilterItemProps) {
  let items: string[] = [];

  switch (type) {
    case 'author':
      items = getUniqueValuesByKey(data, 'author');
      break;
    case 'release_date':
      items = ['Сначала новые', 'Сначала старые', 'По умолчанию'];
      break;
    case 'genre':
      items = getUniqueValuesByKey(data, 'genre');
      break;
  }

  return (
    <div className={styles.filter__dropdown}>
      <ul className={styles.filter__list}>
        {items.map((item, index) => (
          <li key={index} className={styles.filter__item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
