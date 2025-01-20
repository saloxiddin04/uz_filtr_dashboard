import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    user: authSlice
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([]),
});
