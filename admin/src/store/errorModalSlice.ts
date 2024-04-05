import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ErrorState {
  isErrorModal: boolean;
  errorMessage: {
    headerText: string;
    labelText: string;
    linkUrl?: string;
  };
}

const initialState: ErrorState = {
  isErrorModal: false,
  errorMessage: {
    headerText: "",
    labelText: "",
    linkUrl: "",
  },
};

const errorModalSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setIsErrorModal: (state, action: PayloadAction<boolean>) => {
      state.isErrorModal = action.payload;
    },
    setErrorMessage: (
      state,
      action: PayloadAction<{
        headerText: string;
        labelText: string;
        linkUrl?: string;
      }>
    ) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setIsErrorModal, setErrorMessage } = errorModalSlice.actions;

export default errorModalSlice.reducer;
