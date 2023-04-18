import { createSlice } from "@reduxjs/toolkit";

export interface Folder {
  id: string;
  ownerId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface FolderArr {
  newFolder: Folder;
  folders: Folder[];
}

const folderOneInitialState: Folder = {
  id: "",
  ownerId: "",
  name: "",
  createdAt: "",
  updatedAt: "",
};

const initialState: FolderArr = {
  newFolder: folderOneInitialState,
  folders: [],
};

export const folderSlice = createSlice({
  name: "folder",
  initialState: initialState,
  reducers: {
    update(state, action) {
      state.folders = action.payload.folders;
      return;
    },
    addOne(state, action) {
      state.folders = [...state.folders, action.payload.newFolder];
      return;
    },
    clear(state) {
      state.folders = [];
      state.newFolder = folderOneInitialState;
    },
  },
});
