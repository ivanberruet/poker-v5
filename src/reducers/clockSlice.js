import { createSlice } from '@reduxjs/toolkit';

const clockSlice = createSlice({
  name: 'clock',
  initialState: {
    minutes: "00",
    seconds: 900,
  },
  reducers: {
    setMinutes: (state, action) => {
      state.minutes = action.payload;
    },
    setSeconds: (state, action) => {
      state.seconds = action.payload;
    },
  },
});

export const { setMinutes, setSeconds } = clockSlice.actions;

export default clockSlice.reducer;
