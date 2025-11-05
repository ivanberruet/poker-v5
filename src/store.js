import { configureStore } from '@reduxjs/toolkit';
import chipsSlice from './reducers/chipsSlice';
import sheetsSlice from './reducers/sheetsSlice';
import playersSlice from './reducers/playersSlice';
import moneySlice from './reducers/moneySlice';
import timeSlice from './reducers/timeSlice';
import structureSlice from './reducers/structureSlice';
import gameSlice from './reducers/gameSlice';
import clockSlice from './reducers/clockSlice';
import historySlice from './reducers/historySlice';

export const store = configureStore({
  reducer: {
    sheets: sheetsSlice,
    chips: chipsSlice,
    players: playersSlice,
    money: moneySlice,
    time: timeSlice,
    structure: structureSlice,
    game: gameSlice,
    clock: clockSlice,
    history: historySlice,
  },
});

export default store;
