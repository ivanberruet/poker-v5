import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    history: [],
  },
  reducers: {
    setHistoryData: (state, action) => {
      state.history = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    setReEntry: (state, action) => {
      state.reEntry = action.payload;
    },
    setEliminatedTime: (state, action) => {
      state.eliminatedTime = action.payload;
    },
    setInGameTime: (state, action) => {
      state.inGameTime = action.payload;
    },
    setPrize: (state, action) => {
      state.prize = action.payload;
    }
  },
});

export const { setHistoryData, setDate, setStartTime, setEndTime, setPosition, setPlayer, setReEntry, setEliminatedTime, setInGameTime, setPrize } = historySlice.actions;

export default historySlice.reducer;
