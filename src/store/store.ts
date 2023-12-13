import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./tasks";
import { columnSlice } from "./columns";
import { typeSlice } from "./types";
import { urgencySlice } from "./urgency";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    columns: columnSlice.reducer,
    types: typeSlice.reducer,
    urgency: urgencySlice.reducer,
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;