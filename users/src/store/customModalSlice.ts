import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CustomModalState {
  isCustomModal: boolean;
  errorMessage: {
    headerText: string;
    labelText: string;
    linkUrl?: string;
  };
}

const initialState: CustomModalState = {
  isCustomModal: false,
  errorMessage: {
    headerText: "",
    labelText: "",
    linkUrl: "",
  },
};

const customModalSlice = createSlice({
  name: "customModal",
  initialState,
  reducers: {
    setIsCustomModal: (state, action: PayloadAction<boolean>) => {
      state.isCustomModal = action.payload;
    },
    setErrorMessage: (
      state,
      action: PayloadAction<{ headerText: string; labelText: string; linkUrl?: string }>
    ) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setIsCustomModal, setErrorMessage } = customModalSlice.actions;

export default customModalSlice.reducer;
