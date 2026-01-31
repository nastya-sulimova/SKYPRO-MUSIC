'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import {
  setIsPlay,
  clearShouldPlay,
  setNextTrack,
  toggleShuffle,
  setPrevTrack,
} from '@/store/features/trackSlice';
import ProgressBar from '../ProgressBar/ProgressBar';
import { getTimePanel } from '@/utils/helper';
import { useLikeTrack } from '@/hooks/useLikeTracks';

export default function Bar() {
  const { currentTrack, isPlay, shouldPlay, isShuffle } = useAppSelector(
    (state) => state.tracks,
  );
  const { access } = useAppSelector((state) => state.auth);
  const { toggleLike, isLike } = useLikeTrack();
  const dispatch = useAppDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isLoop, setIsLoop] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  useEffect(() => {
    if (currentTrack && audioRef.current && shouldPlay) {
      setIsLoadedTrack(false);
      audioRef.current.src = currentTrack.track_file;
      audioRef.current.volume = volume;
      dispatch(clearShouldPlay());
    }
  }, [currentTrack, shouldPlay, dispatch, volume]);

  useEffect(() => {
    setIsLoadedTrack(false);
    setCurrentTime(0);
    setDuration(0);
  }, [currentTrack]);

  if (!currentTrack) return <></>;

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };

  const togglePlay = () => {
    if (isPlay) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
      audioRef.current
        .play()
        .then(() => {
          dispatch(setIsPlay(true));
          setIsLoadedTrack(true);
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
          dispatch(setIsPlay(false));
          setIsLoadedTrack(true);
        });
    }
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      setCurrentTime(inputTime);
      audioRef.current.currentTime = inputTime;
    }
  };

  const onNextTrackAutoPlay = () => {
    dispatch(setNextTrack());
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const trackIsLiked = currentTrack ? isLike(currentTrack._id) : false;

  const handleLikeClick = () => {
    if (!currentTrack) return;
    if (!access) {
      setShowError(true);
      return;
    }
    toggleLike(currentTrack);
  };

  if (!currentTrack) return <></>;

  return (
    <div className={styles.bar}>
      {showError && (
        <div className={styles.errorMessage}>
          Войдите в аккаунт, чтобы ставить лайки
        </div>
      )}

      <audio
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onNextTrackAutoPlay}
        ref={audioRef}
        style={{ display: 'none' }}
      ></audio>

      <div className={styles.bar__content}>
        {!isLoadedTrack ? (
          <span className={styles.loadingText}>Загрузка...</span>
        ) : (
          ''
        )}
        <ProgressBar
          max={duration || 0}
          step={0.1}
          readOnly={!isLoadedTrack}
          value={currentTime}
          onChange={onChangeProgress}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={onPrevTrack} className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnPlay, styles.btn)}
                onClick={togglePlay}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlay
                        ? '/img/icon/sprite.svg#icon-pause'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>
              <div onClick={onNextTrack} className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={onToggleLoop}
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg
                  className={classnames(styles.player__btnRepeatSvg, {
                    [styles.active]: isLoop,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={onToggleShuffle}
              >
                <svg
                  className={classnames(styles.player__btnShuffleSvg, {
                    [styles.active]: isShuffle,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div
                className={styles.trackPlay__likeContainer}
                onClick={handleLikeClick}
                style={{ cursor: 'pointer' }}
              >
                <svg
                  className={classnames(styles.trackPlay__likeSvg, {
                    [styles.liked]: trackIsLiked,
                  })}
                >
                  <use
                    xlinkHref={`/img/icon/sprite.svg#${trackIsLiked ? 'icon-like' : 'icon-dislike'}`}
                  ></use>
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.bar__playerProgressAndVolume}>
            <div className={styles.bar__playerProgress}>
              <div className={styles.timeDisplay}>
                {getTimePanel(currentTime, duration)}
              </div>
            </div>

            <div className={styles.bar__volumeBlock}>
              <div className={styles.volume__content}>
                <div className={styles.volume__image}>
                  <svg className={styles.volume__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                  </svg>
                </div>
                <div
                  className={classnames(styles.volume__progress, styles.btn)}
                >
                  <input
                    className={classnames(
                      styles.volume__progressLine,
                      styles.btn,
                    )}
                    type="range"
                    name="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      if (audioRef.current)
                        audioRef.current.volume = Number(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
