import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    info: null,
    id: '37i9dQZF1DXd9zR7tdziuQ'
  },
  reducers: {
    setPlaylistInfo: (state, action) => {
      state.info = action.payload;
    },
    setPlaylistId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setPlaylistInfo, setPlaylistId } = playlistSlice.actions;

export default playlistSlice.reducer;
