import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import ReduxProvider from '@/store/ReduxProvider';
import Track from './Track';
import { FormatTime } from '@/utils/helper';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe('Track component', () => {
  test('Отрисовка данных трека', () => {
    render(
      <ReduxProvider>
        <Track tracks={mockTracks} playlist={mockTracks} />
      </ReduxProvider>,
    );
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(FormatTime(mockTrack.duration_in_seconds)).length,
    ).toBeGreaterThan(0);
  });
});
