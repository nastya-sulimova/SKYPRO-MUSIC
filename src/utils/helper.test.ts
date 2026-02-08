import { FormatTime, getUniqueValuesByKey, getTimePanel } from './helper';
import { TrackType } from '@/sharedTypes/sharedTypes';

describe('FormatTime', () => {
  it('Добавление нуля, если секунд < 10', () => {
    expect(FormatTime(61)).toBe('1:01');
  });
  it('Форматирует время < 1 минуты', () => {
    expect(FormatTime(35)).toBe('0:35');
  });
  it('Обрабатывает 0 секунд', () => {
    expect(FormatTime(0)).toBe('0:00');
  });
});

describe('getUniqueValuesByKey', () => {
  const mockTracks: TrackType[] = [
    {
      _id: 1,
      author: 'Author 1',
      genre: ['Rock'],
      name: 'Track 1',
      album: 'Album 1',
      release_date: '2023-01-01',
      track_file: 'url1',
      duration_in_seconds: 180,
      logo: null,
      stared_user: [],
    },
    {
      _id: 2,
      author: 'Author 2',
      genre: ['Pop', 'Rock'],
      name: 'Track 2',
      album: 'Album 2',
      release_date: '2023-01-01',
      track_file: 'url2',
      duration_in_seconds: 200,
      logo: null,
      stared_user: [],
    },
    {
      _id: 3,
      author: 'Author 1',
      genre: ['Jazz'],
      name: 'Track 3',
      album: 'Album 3',
      release_date: '2023-01-01',
      track_file: 'url3',
      duration_in_seconds: 150,
      logo: null,
      stared_user: [],
    },
  ];

  it('возвращает уникальных авторов', () => {
    const result = getUniqueValuesByKey(mockTracks, 'author');
    expect(result).toEqual(['Author 1', 'Author 2']);
  });

  it('возвращает уникальные жанры', () => {
    const result = getUniqueValuesByKey(mockTracks, 'genre');
    expect(result).toEqual(['Rock', 'Pop', 'Jazz']);
  });

  it('возвращает пустой массив для пустого массива треков', () => {
    const result = getUniqueValuesByKey([], 'author');
    expect(result).toEqual([]);
  });

  it('обрабатывает треки без указанного поля', () => {
    const tracksWithoutAuthor = mockTracks.map((track) => ({
      ...track,
      author: undefined,
    }));

    const result = getUniqueValuesByKey(
      tracksWithoutAuthor as unknown as TrackType[],
      'author',
    );
    expect(result).toEqual([]);
  });
});

describe('getTimePanel', () => {
  it('форматирует время с общим временем', () => {
    expect(getTimePanel(65, 180)).toBe('1:05 / 3:00');
  });

  it('работает с нулевым временем', () => {
    expect(getTimePanel(0, 0)).toBe('0:00 / 0:00');
  });

  it('работает с undefined totalTime', () => {
    expect(getTimePanel(30, undefined)).toBe('0:30 / 0:00');
    expect(getTimePanel(0, undefined)).toBe('0:00 / 0:00');
  });

  it('работает с обычными значениями', () => {
    expect(getTimePanel(30, 180)).toBe('0:30 / 3:00');
    expect(getTimePanel(65, 245)).toBe('1:05 / 4:05');
  });
});
