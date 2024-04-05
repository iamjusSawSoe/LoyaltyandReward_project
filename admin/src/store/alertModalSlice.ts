import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AlertModalState {
  isAlertModalOpen: boolean;
  title: string;
  content: string;
}

const initialState: AlertModalState = {
  isAlertModalOpen: false,
  title: "",
  content: "",
};

const customModalSlice = createSlice({
  name: "customModal",
  initialState,
  reducers: {
    updateAlertModal: (state, action: PayloadAction<AlertModalState>) => {
      state.isAlertModalOpen = action.payload.isAlertModalOpen;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
    resetAlertModal: () => initialState,
  },
});

export const { updateAlertModal, resetAlertModal } = customModalSlice.actions;

export default customModalSlice.reducer;
