import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./tasks";
import { columnSlice } from "./columns";

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    columns: columnSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
