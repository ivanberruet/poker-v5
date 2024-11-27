import { createSlice } from '@reduxjs/toolkit';

const timeSlice = createSlice({
  name: 'time',
  initialState: {
    perLevel: 15,
    currentLevel: 1,
  },
  reducers: {
    setPerLevel: (state, action) => {
      state.perLevel = action.payload;
    },
    setCurrentLevel: (state, action) => {
      state.currentLevel = action.payload;
    },
  },
});

export const { setPerLevel, setCurrentLevel } = timeSlice.actions;

export default timeSlice.reducer;
