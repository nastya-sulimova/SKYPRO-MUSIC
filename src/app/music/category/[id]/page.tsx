'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSelection } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';
import { AxiosError } from 'axios';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const urlId = parseInt(params.id) + 1;

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

          setTracks(resultTracks);
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
  }, [fetchIsLoading]);

  return (
    <Centerblock
      error={error || fetchError}
      tracks={tracks}
      isLoading={isLoading}
      title={title}
    />
  );
}
