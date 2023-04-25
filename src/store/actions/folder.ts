import { folderActions } from "../index";

import { Folder } from "../reducers/folder";

export const updateFolders = (folders: Folder[]) => {
  return async (dispatch: any) => {
    await dispatch(folderActions.update({ folders: folders }));
  };
};

export const addNewFolder = (folder: Folder) => {
  return async (dispatch: any) => {
    await dispatch(folderActions.addNew({ newFolder: folder }));
  };
};

export const updateParentFolder = (folder: Folder) => {
  return async (dispatch: any) => {
    await dispatch(folderActions.updateParent({ parentFolder: folder }));
  };
};

export const clearAllFolders = () => {
  return async (dispatch: any) => {
    await dispatch(folderActions.clear());
  };
};
