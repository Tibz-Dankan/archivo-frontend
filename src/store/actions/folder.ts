import { folderActions } from "../index";

import { Folder } from "../folder";

export const updateFolders = (folders: Folder[]) => {
  return async (dispatch: any) => {
    await dispatch(folderActions.update({ folders: folders }));
  };
};

export const addNewFolder = (folder: Folder) => {
  return async (dispatch: any) => {
    await dispatch(folderActions.addOne({ newFolder: folder }));
  };
};

export const clearAllFolders = () => {
  return async (dispatch: any) => {
    await dispatch(folderActions.clear());
  };
};
