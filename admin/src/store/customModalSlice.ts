import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CustomModalState {
  isCustomModal: boolean;
}

const initialState: CustomModalState = {
  isCustomModal: false,
};

const customModalSlice = createSlice({
  name: "customModal",
  initialState,
  reducers: {
    updateCustomModal: (state, action: PayloadAction<boolean>) => {
      state.isCustomModal = action.payload;
    },
  },
});

export const { updateCustomModal } = customModalSlice.actions;

export default customModalSlice.reducer;
