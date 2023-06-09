import { createSlice } from "@reduxjs/toolkit";

export interface Folder {
  id: string;
  ownerId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface FolderHandler {
  parentFolder: Folder;
  newFolder: Folder;
  folders: Folder[];
}

export interface FolderState {
  folder: FolderHandler;
}

const folderOneInitialState: Folder = {
  id: "",
  ownerId: "",
  name: "",
  createdAt: "",
  updatedAt: "",
};

interface FolderList {
  folders: Folder[];
}

export interface UpdateFoldersAction {
  payload: FolderList;
  type: string;
}

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

const initialState: FolderHandler = {
  parentFolder: folderOneInitialState,
  newFolder: folderOneInitialState,
  folders: [],
};

export const folderSlice = createSlice({
  name: "folder",
  initialState: initialState,
  reducers: {
    update(state, action: UpdateFoldersAction) {
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
