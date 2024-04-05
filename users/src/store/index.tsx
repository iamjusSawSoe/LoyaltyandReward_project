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
import storage from "redux-persist/lib/storage";
import customModalReducer from "./customModalSlice";
import earnPointsReducer from "./earnPointsSlice";
import errorReducer from "./errorSlice";
import loadingReducer from "./loadingSlice";
import registerReducer from "./registerSlice";
import successReducer from "./successSlice";

// Encryption Key
const encryptionKey = "exkXH6J1EjrtSg6Ywdfa+v1IVmwDEPv4B/T3tyyAPdz5/aMbBs73GOGLnrvbbA9Q";

// Encryptor
const encryptor = encryptTransform({
  secretKey: encryptionKey,
  onError: function (error) {
    console.log(error, "error");
  },
});

const rootReducer = combineReducers({
  register: persistReducer(
    {
      key: "register",
      storage: storage,
      transforms: [encryptor],
    },
    registerReducer
  ),
  earnPoints: earnPointsReducer,
  error: errorReducer,
  success: successReducer,
  loading: loadingReducer,
  customModal: customModalReducer,
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
