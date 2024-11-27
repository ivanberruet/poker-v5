import { createSlice } from '@reduxjs/toolkit';

const structureSlice = createSlice({
  name: 'structure',
  initialState: {
    blinds: null,
  },
  reducers: {
    setBlindsStructure: (state, action) => {
      state.blinds = action.payload;
    },
  },
});

export const { setBlindsStructure } = structureSlice.actions;

export default structureSlice.reducer;
