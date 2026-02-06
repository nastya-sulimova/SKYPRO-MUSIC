'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './search.module.css';
import { useAppDispatch } from '@/store/store';
import { setSearchQuery } from '@/store/features/trackSlice';
import debounce from 'lodash.debounce';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();

  const updateSearchQuery = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
    }, 300),
    [dispatch],
  );

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    updateSearchQuery(e.target.value);
  };

  useEffect(() => {
    return () => {
      updateSearchQuery.cancel();
    };
  }, [updateSearchQuery]);

  const handleClearSearch = () => {
    setSearchInput('');
    dispatch(setSearchQuery(''));
  };

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}
