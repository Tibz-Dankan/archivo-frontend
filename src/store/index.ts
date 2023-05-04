import { configureStore } from "@reduxjs/toolkit";
import { folderSlice } from "./reducers/folder";
import { fileSlice } from "./reducers/file";
import { authSlice } from "./reducers/auth";
import { pathSlice } from "./reducers/path";

export const store = configureStore({
  reducer: {
    folder: folderSlice.reducer,
    file: fileSlice.reducer,
    path: pathSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const folderActions = folderSlice.actions;
export const fileActions = fileSlice.actions;
export const pathActions = pathSlice.actions;
