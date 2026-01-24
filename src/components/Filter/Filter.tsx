'use client';

import { useState } from 'react';
import styles from './filter.module.css';
import { FilterItem } from '../FilterItem/FilterItem';
import classNames from 'classnames';
import { TrackType } from '@/sharedTypes/sharedTypes';

// Определяем тип пропсов
type FilterblockProps = {
  tracks: TrackType[];
};

export default function Filter({ tracks }: FilterblockProps) {
  const [openFilter, setOpenFilter] = useState<
    'author' | 'year' | 'genre' | null
  >(null);

  const toggleFilter = (filter: 'author' | 'year' | 'genre') => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>

      <div className={styles.filter__wrapper}>
        <button
          onClick={() => toggleFilter('author')}
          className={classNames(styles.filter__button, {
            [styles.filter__button_active]: openFilter === 'author',
          })}
        >
          исполнителю
        </button>

        {openFilter === 'author' && (
          <div className={styles.filter__dropdown_wrapper}>
            <FilterItem tracks={tracks} type="author" />
          </div>
        )}
      </div>

      <div className={styles.filter__wrapper}>
        <button
          onClick={() => toggleFilter('year')}
          className={classNames(styles.filter__button, {
            [styles.filter__button_active]: openFilter === 'year',
          })}
        >
          году выпуска
        </button>

        {openFilter === 'year' && (
          <div className={styles.filter__dropdown_wrapper}>
            <FilterItem tracks={tracks} type="release_date" />
          </div>
        )}
      </div>

      <div className={styles.filter__wrapper}>
        <button
          onClick={() => toggleFilter('genre')}
          className={classNames(styles.filter__button, {
            [styles.filter__button_active]: openFilter === 'genre',
          })}
        >
          жанру
        </button>

        {openFilter === 'genre' && (
          <div className={styles.filter__dropdown_wrapper}>
            <FilterItem tracks={tracks} type="genre" />
          </div>
        )}
      </div>
    </div>
  );
}
