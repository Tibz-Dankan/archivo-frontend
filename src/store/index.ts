import { configureStore } from "@reduxjs/toolkit";
import { folderSlice } from "./reducers/folder";
import { authSlice } from "./reducers/auth";

export const store = configureStore({
  reducer: {
    folder: folderSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const folderActions = folderSlice.actions;
