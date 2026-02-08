'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getFavoriteTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import {
  resetFilters,
  setFavoriteTracks,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks, filteredTracks, filters } =
    useAppSelector((state) => state.tracks);

  const [playlist, setPlaylist] = useState<TrackType[]>([]);
  const { access } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

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
      pagePlaylist={allTracks}
      error={fetchError}
      tracks={filteredTracks}
      isLoading={fetchIsLoading}
      title="Треки"
    />
  );
}
