import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categorySlice from "./categories/categorySlice";

export const store = configureStore({
  reducer: {
    user: authSlice,
    category: categorySlice
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([]),
});
