import { store } from "../../store";

let currentToken = "";

store.subscribe(() => {
  const state = store.getState();
  currentToken = state.register.token.key;
});

export const getToken = () => currentToken;
