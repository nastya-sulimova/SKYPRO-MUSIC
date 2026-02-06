'use client';

import styles from './centerblock.module.css';
import classnames from 'classnames';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useEffect } from 'react';
import { setPagePlaylist } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

// Определяем тип пропсов
type CenterblockProps = {
  pagePlaylist: TrackType[];
  tracks: TrackType[];
  isLoading: boolean;
  title?: string;
  error?: string | null;
};

export default function Centerblock({
  pagePlaylist,
  tracks,
  isLoading,
  title = 'Треки',
  error,
}: CenterblockProps) {
  const dispatch = useAppDispatch();
  const { filters, searchQuery } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (!isLoading && !error) {
      dispatch(setPagePlaylist(pagePlaylist));
    }
  }, [isLoading, error, pagePlaylist, dispatch]);

  const hasActiveFiltersOrSearch =
    filters.authors.length > 0 ||
    filters.genres.length > 0 ||
    filters.years !== 'По умолчанию' ||
    searchQuery !== '';

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={pagePlaylist} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        {isLoading ? (
          <div className={styles.loading}>Загрузка треков...</div>
        ) : error ? (
          <div className={styles.loading}>{error}</div>
        ) : hasActiveFiltersOrSearch && tracks.length === 0 ? (
          <div className={styles.loading}>Нет подходящих треков</div>
        ) : (
          <Track tracks={tracks} playlist={tracks} />
        )}
      </div>
    </div>
  );
}
