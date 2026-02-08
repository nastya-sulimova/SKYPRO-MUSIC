import { applyFilters } from './applyFilters';
import { initialStateType } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

describe('applyFilters', () => {
  const mockTracks: TrackType[] = [
    {
      _id: 1,
      name: 'Rock And Roll',
      author: 'Led Zeppelin',
      genre: ['Rock'],
      duration_in_seconds: 120,
      album: 'Album 1',
      logo: null,
      stared_user: [],
      release_date: '2023-01-01',
      track_file: 'url1',
    },
    {
      _id: 2,
      name: 'We Will Rock You',
      author: 'Queen',
      genre: ['Rock'],
      duration_in_seconds: 180,
      album: 'Album 2',
      logo: null,
      stared_user: [],
      release_date: '2023-01-01',
      track_file: 'url2',
    },
    {
      _id: 3,
      name: 'Rock This Town',
      author: 'Stray Cats',
      genre: ['Rockabilly'],
      duration_in_seconds: 150,
      album: 'Album 3',
      logo: null,
      stared_user: [],
      release_date: '2023-01-01',
      track_file: 'url3',
    },
  ];

  const createMockState = (
    overrides: Partial<initialStateType>,
  ): initialStateType => {
    const baseState: initialStateType = {
      pagePlaylist: [],
      searchQuery: '',
      currentTrack: null,
      isPlay: false,
      shouldPlay: false,
      playlist: [],
      shuffledPlaylist: [],
      filters: {
        authors: [],
        genres: [],
        years: 'По умолчанию',
      },
      isShuffle: false,
      allTracks: [],
      favoriteTracks: [],
      fetchError: null,
      fetchIsLoading: false,
      filteredTracks: [],
    };

    return {
      ...baseState,
      ...overrides,
      filters: {
        ...baseState.filters,
        ...(overrides.filters || {}),
      },
    };
  };

  it('фильтрует по поисковому запросу (по началу названия)', () => {
    const state = createMockState({
      pagePlaylist: mockTracks,
      searchQuery: 'rock',
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(2);
    expect(result.map((track) => track.name)).toEqual([
      'Rock And Roll',
      'Rock This Town',
    ]);
  });

  it('НЕ находит по подстроке в середине названия', () => {
    const state = createMockState({
      pagePlaylist: mockTracks,
      searchQuery: 'will',
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(0);
  });

  it('игнорирует регистр при поиске', () => {
    const state = createMockState({
      pagePlaylist: mockTracks,
      searchQuery: 'ROCK',
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(2);
  });

  it('обрезает пробелы в поисковом запросе', () => {
    const state = createMockState({
      pagePlaylist: mockTracks,
      searchQuery: '  rock  ',
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(2);
  });

  it('НЕ ищет по автору', () => {
    const state = createMockState({
      pagePlaylist: mockTracks,
      searchQuery: 'queen',
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(0);
  });

  it('фильтрует по авторам', () => {
    const state = createMockState({
      pagePlaylist: mockTracks,
      filters: {
        authors: ['Queen'],
        genres: [],
        years: 'По умолчанию',
      },
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(1);
    expect(result[0].author).toBe('Queen');
  });

  it('фильтрует по жанрам', () => {
    const state = createMockState({
      pagePlaylist: mockTracks,
      filters: {
        authors: [],
        genres: ['Rockabilly'],
        years: 'По умолчанию',
      },
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Rock This Town');
  });

  it('фильтрует по году выпуска (сначала новые)', () => {
    const tracksWithDifferentDates = [
      { ...mockTracks[0], release_date: '2020-01-01' },
      { ...mockTracks[1], release_date: '2023-01-01' },
      { ...mockTracks[2], release_date: '2021-01-01' },
    ];

    const state = createMockState({
      pagePlaylist: tracksWithDifferentDates,
      filters: {
        authors: [],
        genres: [],
        years: 'Сначала новые',
      },
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(3);
    expect(result[0].release_date).toBe('2023-01-01');
    expect(result[1].release_date).toBe('2021-01-01');
    expect(result[2].release_date).toBe('2020-01-01');
  });

  it('возвращает все треки при пустых фильтрах', () => {
    const state = createMockState({
      pagePlaylist: mockTracks,
      searchQuery: '',
      filters: {
        authors: [],
        genres: [],
        years: 'По умолчанию',
      },
    });

    const result = applyFilters(state);
    expect(result).toHaveLength(3);
  });
});
