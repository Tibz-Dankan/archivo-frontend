import { configureStore } from "@reduxjs/toolkit";
import { folderSlice } from "./reducers/folder";
import { fileSlice } from "./reducers/file";
import { authSlice } from "./reducers/auth";

export const store = configureStore({
  reducer: {
    folder: folderSlice.reducer,
    file: fileSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const folderActions = folderSlice.actions;
export const fileActions = fileSlice.actions;
