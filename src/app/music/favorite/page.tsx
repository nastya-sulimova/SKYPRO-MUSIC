'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FavoritePage() {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!access) {
      router.push('/music/main');
    }
  }, [access, router]);

  if (!access) {
    return null;
  }

  return (
    <Centerblock tracks={favoriteTracks} isLoading={false} title="Мои треки" />
  );
}
