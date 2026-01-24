'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <Centerblock
      error={fetchError}
      tracks={allTracks}
      isLoading={fetchIsLoading}
      title="Треки"
    />
  );
}
