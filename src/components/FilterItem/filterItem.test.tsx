import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { FilterItem } from './FilterItem';
import { trackSliceReducer } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

describe('FilterItem Component', () => {
  const mockTracks: TrackType[] = [
    {
      _id: 1,
      name: 'Track 1',
      author: 'Author 1',
      genre: ['Rock'],
      duration_in_seconds: 180,
      album: 'Album 1',
      logo: null,
      stared_user: [],
      release_date: '2023-01-01',
      track_file: 'url1',
    },
    {
      _id: 2,
      name: 'Track 2',
      author: 'Author 2',
      genre: ['Pop'],
      duration_in_seconds: 200,
      album: 'Album 2',
      logo: null,
      stared_user: [],
      release_date: '2023-01-01',
      track_file: 'url2',
    },
    {
      _id: 3,
      name: 'Track 3',
      author: 'Author 1',
      genre: ['Jazz'],
      duration_in_seconds: 150,
      album: 'Album 3',
      logo: null,
      stared_user: [],
      release_date: '2023-01-01',
      track_file: 'url3',
    },
  ];

  const renderWithProvider = (
    props: {
      tracks: TrackType[];
      type: 'author' | 'release_date' | 'genre';
      onSelect: jest.Mock;
    },
    initialState = {},
  ) => {
    const store = configureStore({
      reducer: {
        tracks: trackSliceReducer,
      },
      preloadedState: {
        tracks: {
          currentTrack: null,
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
          ...initialState,
        },
      },
    });

    return {
      store,
      ...render(
        <Provider store={store}>
          <FilterItem {...props} />
        </Provider>,
      ),
    };
  };

  it('рендерит список авторов', () => {
    const mockOnSelect = jest.fn();
    renderWithProvider({
      tracks: mockTracks,
      type: 'author',
      onSelect: mockOnSelect,
    });

    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
    expect(screen.getAllByText('Author 1')).toHaveLength(1);
  });

  it('рендерит список жанров', () => {
    const mockOnSelect = jest.fn();
    renderWithProvider({
      tracks: mockTracks,
      type: 'genre',
      onSelect: mockOnSelect,
    });

    expect(screen.getByText('Rock')).toBeInTheDocument();
    expect(screen.getByText('Pop')).toBeInTheDocument();
    expect(screen.getByText('Jazz')).toBeInTheDocument();
  });

  it('рендерит опции сортировки по году', () => {
    const mockOnSelect = jest.fn();
    renderWithProvider({
      tracks: mockTracks,
      type: 'release_date',
      onSelect: mockOnSelect,
    });

    expect(screen.getByText('Сначала новые')).toBeInTheDocument();
    expect(screen.getByText('Сначала старые')).toBeInTheDocument();
    expect(screen.getByText('По умолчанию')).toBeInTheDocument();
  });

  it('вызывает onSelect при клике на элемент', () => {
    const mockOnSelect = jest.fn();
    renderWithProvider({
      tracks: mockTracks,
      type: 'author',
      onSelect: mockOnSelect,
    });

    const authorElement = screen.getByText('Author 1');
    fireEvent.click(authorElement);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith('Author 1');
  });

  it('подсвечивает выбранный элемент', () => {
    const mockOnSelect = jest.fn();
    renderWithProvider(
      {
        tracks: mockTracks,
        type: 'author',
        onSelect: mockOnSelect,
      },
      {
        filters: {
          authors: ['Author 1'],
          genres: [],
          years: 'По умолчанию',
        },
      },
    );

    const selectedItem = screen.getByText('Author 1');
    expect(selectedItem).toHaveClass('filter__item_selected');
  });

  it('подсвечивает выбранный жанр', () => {
    const mockOnSelect = jest.fn();
    renderWithProvider(
      {
        tracks: mockTracks,
        type: 'genre',
        onSelect: mockOnSelect,
      },
      {
        filters: {
          authors: [],
          genres: ['Rock'],
          years: 'По умолчанию',
        },
      },
    );

    const selectedGenre = screen.getByText('Rock');
    expect(selectedGenre).toHaveClass('filter__item_selected');
  });

  it('подсвечивает выбранную сортировку по году', () => {
    const mockOnSelect = jest.fn();
    renderWithProvider(
      {
        tracks: mockTracks,
        type: 'release_date',
        onSelect: mockOnSelect,
      },
      {
        filters: {
          authors: [],
          genres: [],
          years: 'Сначала новые',
        },
      },
    );

    const selectedOption = screen.getByText('Сначала новые');
    expect(selectedOption).toHaveClass('filter__item_selected');
  });
});
