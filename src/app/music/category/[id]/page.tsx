'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFavoriteTracks, getSelection } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { AxiosError } from 'axios';
import {
  resetFilters,
  setFavoriteTracks,
  setPagePlaylist,
} from '@/store/features/trackSlice';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const {
    allTracks,
    fetchIsLoading,
    fetchError,
    filteredTracks,
    filters,
    searchQuery,
  } = useAppSelector((state) => state.tracks);

  const { access } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [categoryTracks, setCategoryTracks] = useState<TrackType[]>([]);
  const urlId = parseInt(params.id) + 1;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);

    if (!fetchIsLoading && allTracks.length) {
      getSelection(urlId.toString())
        .then((res) => {
          setTitle(res.name);
          const tracksId = res.items;
          const resultTracks = allTracks.filter((el) =>
            tracksId.includes(el._id),
          );

          setCategoryTracks(resultTracks);
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              setError(error.response.data);
            } else if (error.request) {
              setError('Ошибочка вышла');
            }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [fetchIsLoading, allTracks, urlId]);

  useEffect(() => {
    if (categoryTracks.length > 0 && !isLoading) {
      dispatch(setPagePlaylist(categoryTracks));
    }
  }, [categoryTracks, isLoading, dispatch]);

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

  const hasActiveFiltersOrSearch =
    filters.authors.length > 0 ||
    filters.genres.length > 0 ||
    filters.years !== 'По умолчанию' ||
    searchQuery !== '';

  const displayTracks = hasActiveFiltersOrSearch
    ? filteredTracks
    : categoryTracks;

  return (
    <Centerblock
      pagePlaylist={categoryTracks}
      error={error || fetchError}
      tracks={displayTracks}
      isLoading={isLoading}
      title={title}
    />
  );
}
