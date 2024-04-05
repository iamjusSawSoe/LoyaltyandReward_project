import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/es/storage";
import adminUserReducer from "./adminUserSlice";
import alertModalReducer from "./alertModalSlice";
import alertReducer from "./alertSlice";
import customModalReducer from "./customModalSlice";
import errorModalReducer from "./errorModalSlice";
import loadingReducer from "./loadingSlice";
import toastReducer from "./toastSlice";
import tokenReducer from "./tokenSlice";

// Encryption Key
const encryptionKey =
  "exkXH6J1EjrtSg6Ywdfa+v1IVmwDEPv4B/T3tyyAPdz5/aMbBs73GOGLnrvbbA9Q";

// Encryptor
const encryptor = encryptTransform({
  secretKey: encryptionKey,
  onError: function (error) {
    console.log(error, "error");
  },
});

const rootReducer = combineReducers({
  token: persistReducer(
    {
      key: "token",
      storage: storage,
      transforms: [encryptor],
    },
    tokenReducer
  ),
  loading: loadingReducer,
  customModal: customModalReducer,
  alertModal: alertModalReducer,
  errorModal: errorModalReducer,
  toast: toastReducer,
  alert: alertReducer,
  adminUser: adminUserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
