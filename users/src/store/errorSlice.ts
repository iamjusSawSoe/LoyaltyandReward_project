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

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    // PayloadAction allows you to define the payload type
    setIsErrorModal: (state, action: PayloadAction<boolean>) => {
      state.isErrorModal = action.payload;
    },
    // PayloadAction allows you to define the payload type
    setErrorMessage: (
      state,
      action: PayloadAction<{ headerText: string; labelText: string; linkUrl?: string }>
    ) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setIsErrorModal, setErrorMessage } = errorSlice.actions;

export default errorSlice.reducer;
