import { createSlice } from '@reduxjs/toolkit';

const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState: {
    currentSongId: null, 
    isPlaying: null,
  },
  reducers: {
    setCurrentSongId: (state, action) => {
      state.currentSongId = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    }
  },
});

export const { setCurrentSongId, setIsPlaying } = currentSongSlice.actions;

export default currentSongSlice.reducer;
