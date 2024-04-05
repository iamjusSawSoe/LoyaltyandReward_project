import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ToastSlice {
  showToast?: boolean;
  toastType?: "error" | "success" | "info" | "warning";
  toastContent: string;
}

const initialState: ToastSlice = {
  toastType: "info",
  showToast: false,
  toastContent: "",
};

const toastSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastSlice>) => {
      state.showToast = true;
      state.toastContent = action.payload.toastContent;
      state.toastType = action.payload.toastType;
    },
    clearToast: () => initialState,
  },
});

export const { setToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
