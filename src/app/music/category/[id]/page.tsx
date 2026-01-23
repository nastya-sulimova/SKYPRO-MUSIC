'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTracks, getSelection } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Centerblock from '@/components/Centerblock/Centerblock';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const urlId = params.id;

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (!urlId) return;

    setIsLoading(true);

    const selectionId = parseInt(urlId) + 1;

    let savedSelectionData: { items: number[]; name: string };

    getSelection(selectionId.toString())
      .then((selectionData) => {
        savedSelectionData = selectionData;

        setCategoryName(selectionData.name);

        return getTracks();
      })
      .then((allTracks) => {
        const filteredTracks = allTracks.filter((track) =>
          savedSelectionData.items.includes(track._id),
        );

        console.log('Отфильтрованные треки:', filteredTracks);
        setTracks(filteredTracks);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        setError('Не удалось загрузить подборку');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [urlId]);

  return (
    <Centerblock
      error={error}
      tracks={tracks}
      isLoading={isLoading}
      title={categoryName}
    />
  );
}
