import { createSlice } from '@reduxjs/toolkit';

const chipsSlice = createSlice({
  name: 'chips',
  initialState: {
    available: null,
    distribution: [],
  },
  reducers: {
    setAvailableChips: (state, action) => {
      state.available = action.payload;
    },
    setDistribution: (state, action) => {
      state.distribution = action.payload;
    },
  },
});

export const { setAvailableChips, setDistribution } = chipsSlice.actions;

export default chipsSlice.reducer;
