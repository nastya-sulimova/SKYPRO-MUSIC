import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  shouldPlay: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  shouldPlay: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
      state.shouldPlay = true;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
      state.shouldPlay = false;
    },
    clearShouldPlay: (state) => {
      state.shouldPlay = false;
    },
  },
});

export const { setCurrentTrack, setIsPlay, clearShouldPlay } =
  trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
