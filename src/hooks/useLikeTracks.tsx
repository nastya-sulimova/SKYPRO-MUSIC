'use client';

import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReauth';
import { AxiosError } from 'axios';
import { useState } from 'react';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: (track: TrackType) => void;
  isLike: (trackId: number) => boolean;
};

export const useLikeTrack = (): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isLike = (trackId: number): boolean => {
    return favoriteTracks.some((t) => t._id === trackId);
  };

  const toggleLike = (track: TrackType) => {
    if (!access) {
      return setErrorMsg('Нет авторизации');
    }

    const trackIsLiked = isLike(track._id);
    const actionApi = trackIsLiked ? removeLike : addLike;
    const actionSlice = trackIsLiked ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);
    withReauth(
      (newToken) => actionApi(newToken, track._id),
      access,
      refresh,
      dispatch,
    )
      .then(() => {
        dispatch(actionSlice(track));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMsg(error.response.data.message);
          } else if (error.request) {
            setErrorMsg('Произошла ошибка. Попробуйте позже');
          } else {
            setErrorMsg('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
