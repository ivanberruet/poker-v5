import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    date: null,
    startTime: null,
    endTime: null,
    inGameTime: 0,
    isStarted: false,
    isPaused: false,
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setInGameTime: (state, action) => {
      state.inGameTime = action.payload;
    },
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    },
    setIsPaused: (state, action) => {
      state.isPaused = action.payload;
    },
  
  },
});

export const { setDate, setStartTime, setEndTime, setInGameTime, setIsStarted, setIsPaused } = gameSlice.actions;

export default gameSlice.reducer;
