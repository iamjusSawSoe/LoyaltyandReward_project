import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

export interface TokenState {
  token: string;
  tokenExpireTime: string;
  refreshToken: string;
}

const initialState: TokenState = {
  token: "",
  tokenExpireTime: "",
  refreshToken: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<TokenState>) => {
      state.token = action.payload.token;
      state.tokenExpireTime = action.payload.tokenExpireTime;
      state.refreshToken = action.payload.refreshToken;
    },
    resetToken: () => initialState,
  },
});

export const { updateToken, resetToken } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.token;

export default tokenSlice.reducer;
