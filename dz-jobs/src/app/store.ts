import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slicies/themeSlice";
import { DZJobsApi } from "./services/DZJobsApi";
import authReducer from "./slicies/authSlice";
import { notificationReducer } from "../features";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    notification: notificationReducer,
    auth: authReducer, // Add auth reducer here
    [DZJobsApi.reducerPath]: DZJobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(DZJobsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
