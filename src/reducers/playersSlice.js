import { createSlice } from '@reduxjs/toolkit';

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    db: [],
    available: [],
    registered: [],
    active: [],
    eliminated: [],
    reentry: [], 
  },
  reducers: {
    setDbPlayers: (state, action) => {
      state.db = action.payload;
    },
    setAvailablePlayers: (state, action) => {
      state.available = action.payload;
    },
    setRegisteredPlayers: (state, action) => {
      state.registered = action.payload;
    },
    setActivePlayers: (state, action) => {
      state.active = action.payload;
    },
    setEliminatedPlayers: (state, action) => {
      state.eliminated = action.payload;
    },
    setReentryPlayers: (state, action) => {
      state.reentry = action.payload;
    },
  },
});

export const { setAvailablePlayers, setDbPlayers, setRegisteredPlayers, setActivePlayers, setEliminatedPlayers, setReentryPlayers } = playersSlice.actions;

export default playersSlice.reducer;
