import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface UserState {
  phoneNumber: string;
  token: {
    key: string;
    expire: number;
  };
  type: string;
}

const initialState: UserState = {
  phoneNumber: "",
  token: {
    key: "",
    expire: 0,
  },
  type: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    // PayloadAction allows you to define the payload type
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    // PayloadAction allows you to define the payload type
    setToken: (state, action: PayloadAction<string>) => {
      state.token = {
        key: action.payload,
        expire: new Date().setMinutes(new Date().getMinutes() + 10),
      };
    },
    // PayloadAction allows you to define the payload type
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  },
});

export const { setPhoneNumber, setToken, setType } = registerSlice.actions;

export const selectRegister = (state: RootState) => state.register;

export default registerSlice.reducer;
