'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { resetFilters } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FavoritePage() {
  const { favoriteTracks, filteredTracks } = useAppSelector(
    (state) => state.tracks,
  );
  const { access } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!access) {
      router.push('/music/main');
    } else {
      dispatch(resetFilters());
    }
  }, [access, router]);

  if (!access) {
    return null;
  }

  return (
    <Centerblock
      pagePlaylist={favoriteTracks}
      error={null}
      tracks={filteredTracks}
      isLoading={false}
      title="Мои треки"
    />
  );
}
