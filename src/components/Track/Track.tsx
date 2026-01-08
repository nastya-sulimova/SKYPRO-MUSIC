'use client';

import styles from './track.module.css';
import { data } from '@/data';
import Link from 'next/link';
import { FormatTime } from '@/utils/helper';
import { useAppDispatch } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

type trackTypeProp = {
  tracks: TrackType[];
};

export default function Track({ tracks }: trackTypeProp) {
  const dispatch = useAppDispatch();

  const onClickTrack = (track: TrackType) => {
    dispatch(setCurrentTrack(track));
  };

  return (
    <div className={styles.content__playlist}>
      {data.map((track) => (
        <div
          key={track._id}
          className={styles.playlist__item}
          onClick={() => onClickTrack(track)}
        >
          <div className={styles.playlist__track}>
            <div className={styles.track__title}>
              <div className={styles.track__titleImage}>
                <svg className={styles.track__titleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                </svg>
              </div>
              <div>
                <Link className={styles.track__titleLink} href="">
                  {track.name} <span className={styles.track__titleSpan}></span>
                </Link>
              </div>
            </div>
            <div className={styles.track__author}>
              <Link className={styles.track__authorLink} href="">
                {track.author}
              </Link>
            </div>
            <div className={styles.track__album}>
              <Link className={styles.track__albumLink} href="">
                {track.album}
              </Link>
            </div>
            <div>
              <svg className={styles.track__timeSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
              </svg>
              <span className={styles.track__timeText}>
                {FormatTime(track.duration_in_seconds)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
