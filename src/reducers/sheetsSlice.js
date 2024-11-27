import { createSlice } from "@reduxjs/toolkit";

const sheetsSlice = createSlice({
  name: "sheets",
  initialState: {
    data: {}, // Store data by range, e.g., { "Fichas!A2:F": [...], "AnotherRange": [...] }
    loading: false,
    error: null,
  },
  reducers: {
    fetchSheetsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSheetsSuccess(state, action) {
      // const { key, values } = action.payload;
      // state.data[key] = values; // Store data for each range
      state.data = action.payload; // Store data for each range
      state.loading = false;
    },
    fetchSheetsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSheetsStart, fetchSheetsSuccess, fetchSheetsFailure } = sheetsSlice.actions;
export default sheetsSlice.reducer;
