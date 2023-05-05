import { createSlice } from "@reduxjs/toolkit";
import { Folder } from "./folder";

interface Path {
  path: Folder[];
}

interface CurrentFolder {
  folder: Folder;
}

interface AddFolderAction {
  payload: CurrentFolder;
  type: string;
}

export interface PathState {
  path: Path;
}

const initialPathState: Path = {
  path: [],
};

export const pathSlice = createSlice({
  name: "path",
  initialState: initialPathState,
  reducers: {
    addFolder: (state, action: AddFolderAction) => {
      state.path.push(action.payload.folder);
    },
    removeFolder: (state) => {
      state.path.pop();
    },
    clear: (state) => {
      state.path = [];
    },
  },
});
