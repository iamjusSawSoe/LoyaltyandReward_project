import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
interface SuccessState {
  successMessage: {
    headerText: string;
    labelText: string;
    spanText?: string;
    linkUrl: string;
    buttonText: string;
  };
}

const initialState: SuccessState = {
  successMessage: {
    headerText: "",
    labelText: "",
    spanText: "",
    linkUrl: "",
    buttonText: "",
  },
};

const successSlice = createSlice({
  name: "success",
  initialState,
  reducers: {
    // PayloadAction allows you to define the payload type
    setSuccessMessage: (
      state,
      action: PayloadAction<{
        headerText: string;
        labelText: string;
        spanText?: string;
        linkUrl: string;
        buttonText: string;
      }>
    ) => {
      state.successMessage = action.payload;
    },
  },
});

export const { setSuccessMessage } = successSlice.actions;

export default successSlice.reducer;
