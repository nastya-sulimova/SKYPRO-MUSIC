import { getUniqueValuesByKey } from '@/utils/helper';
import styles from './filterItem.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';

type FilterItemProps = {
  tracks: TrackType[];
  type: 'author' | 'release_date' | 'genre';
};

export function FilterItem({ tracks, type }: FilterItemProps) {
  let items: string[] = [];

  switch (type) {
    case 'author':
      items = getUniqueValuesByKey(tracks, 'author');
      break;
    case 'release_date':
      items = ['Сначала новые', 'Сначала старые', 'По умолчанию'];
      break;
    case 'genre':
      items = getUniqueValuesByKey(tracks, 'genre');
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
