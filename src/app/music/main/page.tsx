'use client';

import styles from './page.module.css';
import Bar from '@/components/Bar/Bar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Centerblock from '@/components/Centerblock/Centerblock';
import Navigation from '@/components/Navigation/Navigation';
import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTracks()
      .then((res) => {
        setTracks(res);
        setError(''); // Очищаем ошибку если успешно
        //res[0]. вывести данные, заменить моковые на данные сервера, через map() + обработать ошибки
        //учесть, что id начинаются (особенность) не с 1, а 2, то есть плейлисты 2, 3 и 4
        //чтобы отобразить треки, нужно сначала получить все треки, сначала запрос на все треки
        //отфильтровать и вывести конкретный плейлист

        //а потом отфильтровать по необходимым айдишникам (плейлистам видимо хз)

        // получается на странице подборок нужно выполнять два запроса каждый раз
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError('Проблемы с интернетом, попробуйте позже');
          } else {
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <Centerblock tracks={tracks} isLoading={isLoading} />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
