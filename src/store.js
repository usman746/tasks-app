import { configureStore } from "@reduxjs/toolkit";
import reducer from "./apis/slice";
import { authApi } from "./apis/AuthService";

const store = configureStore({
  reducer: {
    api: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
