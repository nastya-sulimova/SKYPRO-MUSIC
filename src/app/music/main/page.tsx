'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  const { access } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (access) {
      getFavoriteTracks(access)
        .then((favoriteTracks) => {
          dispatch(setFavoriteTracks(favoriteTracks));
        })
        .catch((error) => {
          console.error('Ошибка загрузки любимых треков:', error);
        });
    }
  }, [access, dispatch]);

  return (
    <Centerblock
      error={fetchError}
      tracks={allTracks}
      isLoading={fetchIsLoading}
      title="Треки"
    />
  );
}
