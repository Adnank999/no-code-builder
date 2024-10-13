import { configureStore } from '@reduxjs/toolkit';
import elementReducer from "./elementSlice"

export const store = configureStore({
  reducer: {
    elements: elementReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;