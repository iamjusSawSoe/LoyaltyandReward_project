import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AdminUserState {
  isTableRefetch: boolean;
}

const initialState: AdminUserState = {
  isTableRefetch: false,
};

const adminUserSlice = createSlice({
  name: "customModal",
  initialState,
  reducers: {
    updateIsTableRefetch: (state, action: PayloadAction<boolean>) => {
      state.isTableRefetch = action.payload;
    },
    resetAdminUser: () => initialState,
  },
});

export const { updateIsTableRefetch, resetAdminUser } = adminUserSlice.actions;

export default adminUserSlice.reducer;
