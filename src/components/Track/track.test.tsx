import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Track from './Track';
import { trackSliceReducer } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

jest.mock('@/hooks/useLikeTracks', () => ({
  useLikeTrack: () => ({
    toggleLike: jest.fn(),
    isLike: jest.fn(() => false),
    errorMsg: null,
  }),
}));

describe('Track Component', () => {
  const mockTracks: TrackType[] = [
    {
      _id: 1,
      name: 'Bohemian Rhapsody',
      author: 'Queen',
      genre: ['Rock'],
      duration_in_seconds: 354,
      album: 'A Night at the Opera',
      logo: null,
      stared_user: [],
      release_date: '1975-10-31',
      track_file: 'url1',
    },
    {
      _id: 2,
      name: 'Hey Jude',
      author: 'The Beatles',
      genre: ['Rock', 'Pop'],
      duration_in_seconds: 431,
      album: 'The Beatles (White Album)',
      logo: null,
      stared_user: [],
      release_date: '1968-08-26',
      track_file: 'url2',
    },
  ];

  const renderComponent = (tracks: TrackType[]) => {
    const store = configureStore({
      reducer: {
        tracks: trackSliceReducer,
        auth: () => ({ access: null }),
      },
    });

    return render(
      <Provider store={store}>
        <Track tracks={tracks} playlist={tracks} />
      </Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерит названия треков', () => {
    renderComponent(mockTracks);

    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('Hey Jude')).toBeInTheDocument();
  });

  it('рендерит авторов треков', () => {
    renderComponent(mockTracks);

    expect(screen.getByText('Queen')).toBeInTheDocument();

    const beatlesElements = screen.getAllByText('The Beatles');
    expect(beatlesElements.length).toBeGreaterThan(0);
  });

  it('отображает время треков', () => {
    renderComponent(mockTracks);

    expect(screen.getByText('5:54')).toBeInTheDocument();
    expect(screen.getByText('7:11')).toBeInTheDocument();
  });

  it('рендерит альбомы', () => {
    renderComponent(mockTracks);

    expect(screen.getByText('A Night at the Opera')).toBeInTheDocument();
    expect(screen.getByText('The Beatles (White Album)')).toBeInTheDocument();
  });

  it('отображает контейнер плейлиста', () => {
    renderComponent(mockTracks);

    const playlistContainer = document.querySelector('.content__playlist');
    expect(playlistContainer).toBeInTheDocument();
  });

  it('работает с пустым списком треков', () => {
    renderComponent([]);

    const playlistContainer = document.querySelector('.content__playlist');
    expect(playlistContainer).toBeInTheDocument();
  });

  it('отображает активный трек когда он выбран', () => {
    const store = configureStore({
      reducer: {
        tracks: trackSliceReducer,
        auth: () => ({ access: null }),
      },
      preloadedState: {
        tracks: {
          currentTrack: mockTracks[0],
          isPlay: false,
          shouldPlay: false,
          playlist: [],
          shuffledPlaylist: [],
          isShuffle: false,
          allTracks: [],
          favoriteTracks: [],
          fetchError: null,
          fetchIsLoading: false,
          pagePlaylist: [],
          filteredTracks: [],
          filters: {
            authors: [],
            genres: [],
            years: 'По умолчанию',
          },
          searchQuery: '',
        },
      },
    });

    render(
      <Provider store={store}>
        <Track tracks={mockTracks} playlist={mockTracks} />
      </Provider>,
    );

    const activeElements = document.querySelectorAll('.playlist__item.active');
    expect(activeElements.length).toBe(1);
  });
});
