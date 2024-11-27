import { configureStore } from '@reduxjs/toolkit';
import chipsSlice from './reducers/chipsSlice';
import sheetsSlice from './reducers/sheetsSlice';
import playersSlice from './reducers/playersSlice';
import moneySlice from './reducers/moneySlice';
import timeSlice from './reducers/timeSlice';
import structureSlice from './reducers/structureSlice';
import gameSlice from './reducers/gameSlice';
import clockSlice from './reducers/clockSlice';
import playlistSlice from './reducers/playlistSlice';
import albumSlice from './reducers/albumSlice';
import artistSlice from './reducers/artistSlice';
import currentSongSlice from './reducers/currentSongSlice';
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
    playlist: playlistSlice,
    album: albumSlice,
    artist: artistSlice,
    currentSong: currentSongSlice,
    history: historySlice,
  },
});

export default store;
