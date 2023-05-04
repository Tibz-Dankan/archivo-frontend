import { createSlice } from "@reduxjs/toolkit";
import { Folder } from "./folder";

interface PathState {
  path: Folder[];
}

interface CurrentFolder {
  folder: Folder;
}

interface AddFolderAction {
  payload: CurrentFolder;
  type: string;
}

interface RemoveFolderAction {
  payload: CurrentFolder;
  type: string;
}

const initialPathState: PathState = {
  path: [],
};

export const pathSlice = createSlice({
  name: "path",
  initialState: initialPathState,
  reducers: {
    addFolder: (state, action: AddFolderAction) => {
      state.path.push(action.payload.folder);
    },
    removeFolder: (state, action: RemoveFolderAction) => {
      state.path = state.path.filter(
        (folder) => folder.id !== action.payload.folder.id
      );
    },
    clear: (state) => {
      state.path = [];
    },
  },
});
