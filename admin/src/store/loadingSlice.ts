import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetLoading: () => initialState,
  },
});

export const { updateLoading, resetLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
