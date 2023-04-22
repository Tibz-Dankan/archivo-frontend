import { createSlice } from "@reduxjs/toolkit";

export interface Folder {
  id: string;
  ownerId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface FolderArr {
  parentFolder: Folder;
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

interface ParentFolder {
  parentFolder: Folder;
}

export interface ParentFolderAction {
  payload: ParentFolder;
  type: string;
}

interface NewFolder {
  newFolder: Folder;
}

export interface NewFolderAction {
  payload: NewFolder;
  type: string;
}

const initialState: FolderArr = {
  parentFolder: folderOneInitialState,
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
    addNew(state, action: NewFolderAction) {
      state.folders = [...state.folders, action.payload.newFolder];
      return;
    },
    updateParent(state, action: ParentFolderAction) {
      state.parentFolder = action.payload.parentFolder;
      return;
    },
    clear(state) {
      state.folders = [];
      state.parentFolder = folderOneInitialState;
      state.newFolder = folderOneInitialState;
    },
  },
});
