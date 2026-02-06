import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Search from './Search';
import { trackSliceReducer } from '@/store/features/trackSlice';

jest.mock('lodash.debounce', () => {
  return jest.fn((fn: Function) => {
    const mockedFn = jest.fn((...args: unknown[]) => fn(...args));
    Object.defineProperty(mockedFn, 'cancel', {
      value: jest.fn(),
      writable: true,
    });
    return mockedFn;
  });
});

describe('Search Component', () => {
  const renderWithProvider = () => {
    const store = configureStore({
      reducer: {
        track: trackSliceReducer,
      },
    });

    return render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерит поле поиска', () => {
    renderWithProvider();

    expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('обновляет значение при вводе', () => {
    renderWithProvider();
    const input = screen.getByPlaceholderText('Поиск') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test search' } });
    expect(input.value).toBe('test search');
  });

  it('очищает поле', () => {
    renderWithProvider();
    const input = screen.getByPlaceholderText('Поиск') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });
});
