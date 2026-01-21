import styles from './centerblock.module.css';
import classnames from 'classnames';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';

// Определяем тип пропсов
type CenterblockProps = {
  tracks: TrackType[];
  isLoading: boolean;
  title?: string;
};

export default function Centerblock({
  tracks,
  isLoading,
  title = 'Треки',
}: CenterblockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        {isLoading ? (
          <div className={styles.loading}>Загрузка треков...</div>
        ) : (
          <Track tracks={tracks} playlist={tracks} />
        )}
      </div>
    </div>
  );
}
