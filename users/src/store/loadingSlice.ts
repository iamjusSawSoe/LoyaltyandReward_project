import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface LoadingState {
  loading: boolean;
  pause: boolean;
  route: string;
}

const initialState: LoadingState = {
  loading: false,
  pause: false,
  route: "",
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    updatePause: (state, action: PayloadAction<boolean>) => {
      state.pause = action.payload;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRoute: (state, action: PayloadAction<string>) => {
      state.route = action.payload;
    },
  },
});

export const { updateLoading, updatePause, setRoute } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default loadingSlice.reducer;
