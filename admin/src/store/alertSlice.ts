import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface alertState {
  showAlert?: boolean;
  alertMessageContent: string;
  alertType: "error" | "success" | "info" | "warning";
}

const initialState: alertState = {
  showAlert: false,
  alertMessageContent: "",
  alertType: "info",
};

const alertSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setAlertMsg: (state, action: PayloadAction<alertState>) => {
      state.showAlert = true;
      state.alertMessageContent = action.payload.alertMessageContent;
      state.alertType = action.payload.alertType;
    },
    clearAlertMsg: () => initialState,
  },
});

export const { setAlertMsg, clearAlertMsg } = alertSlice.actions;

export default alertSlice.reducer;
