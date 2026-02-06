import { getUniqueValuesByKey } from '@/utils/helper';
import styles from './filterItem.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import classnames from 'classnames';

type FilterItemProps = {
  tracks: TrackType[];
  type: 'author' | 'release_date' | 'genre';
  onSelect: (value: string) => void;
};

export function FilterItem({ tracks, type, onSelect }: FilterItemProps) {
  const { filters } = useAppSelector((state) => state.tracks);

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

  const isSelected = (item: string): boolean => {
    if (type === 'author') {
      return filters.authors.includes(item);
    }
    if (type === 'genre') {
      return filters.genres.includes(item);
    }
    if (type === 'release_date') {
      return filters.years === item;
    }
    return false;
  };

  return (
    <div className={styles.filter__dropdown}>
      <ul className={styles.filter__list}>
        {items.map((item, index) => (
          <li
            key={index}
            className={classnames(styles.filter__item, {
              [styles.filter__item_selected]: isSelected(item),
            })}
            onClick={() => onSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
