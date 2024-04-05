import { TokenState } from "@/store/tokenSlice";
import { store } from "../../store";

let currentToken: TokenState = {
  token: "",
  tokenExpireTime: "",
  refreshToken: "",
};

store.subscribe(() => {
  const state = store.getState();
  currentToken = state.token;
});

export const getToken = () => currentToken;
