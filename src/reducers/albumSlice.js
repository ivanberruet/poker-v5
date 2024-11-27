import { createSlice } from '@reduxjs/toolkit';

const albumSlice = createSlice({
  name: 'artist',
  initialState: {
    albumId: null, 
  },
  reducers: {
    setAlbumId: (state, action) => {
      state.albumId = action.payload;
    },
  },
});

export const { setAlbumId } = albumSlice.actions;

export default albumSlice.reducer;
