import { createSlice } from "@reduxjs/toolkit";

export interface File {
  id: string;
  ownerId: string;
  name: string;
  systemName: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

interface FileHandler {
  newFile: File;
  files: File[];
}

export interface FileState {
  file: FileHandler;
}

const fileOneInitialState: File = {
  id: "",
  ownerId: "",
  name: "",
  systemName: "",
  url: "",
  createdAt: "",
  updatedAt: "",
};

interface NewFile {
  newFile: File;
}
export interface NewFileAction {
  payload: NewFile;
  type: string;
}

interface UpdateFiles {
  files: File[];
}
export interface UpdateFilesAction {
  payload: UpdateFiles;
  type: string;
}

const initialState: FileHandler = {
  newFile: fileOneInitialState,
  files: [],
};

export const fileSlice = createSlice({
  name: "file",
  initialState: initialState,
  reducers: {
    update(state, action: UpdateFilesAction) {
      state.files = action.payload.files;
      return;
    },
    addNew(state, action: NewFileAction) {
      state.files = [...state.files, action.payload.newFile];
      return;
    },
    clear(state) {
      state.files = [];
      state.newFile = fileOneInitialState;
    },
  },
});
