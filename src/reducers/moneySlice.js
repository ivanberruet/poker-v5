import { createSlice } from '@reduxjs/toolkit';

const moneySlice = createSlice({
  name: 'money',
  initialState: {
    entry: 5000,
    reentry: 5000,
    pool: 0,
    winners: 2,
    prizes: [[100], [70, 30], [65, 25, 10]]
  },
  reducers: {
    setEntry: (state, action) => {
      state.entry = action.payload;
    },
    setReentry: (state, action) => {
      state.reentry = action.payload;
    },
    setPool: (state, action) => {
      state.pool = action.payload;
    },
    setWinners: (state, action) => {
      state.winners = action.payload;
    },
  },
});

export const { setEntry, setReentry, setPool, setWinners } = moneySlice.actions;

export default moneySlice.reducer;
