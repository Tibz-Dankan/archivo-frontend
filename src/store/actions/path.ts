import { pathActions } from "../index";
import { Folder } from "../reducers/folder";

export const addToPath = (folder: Folder) => {
  return async (dispatch: any) => {
    await dispatch(pathActions.addFolder({ folder: folder }));
  };
};

export const removeFromPath = (folder: Folder) => {
  return async (dispatch: any) => {
    await dispatch(pathActions.removeFolder({ folder: folder }));
  };
};

export const clearPath = () => {
  return async (dispatch: any) => {
    await dispatch(pathActions.clear());
  };
};
