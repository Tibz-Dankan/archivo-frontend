import { pathActions } from "../index";
import { Folder } from "../reducers/folder";

export const addToPath = (folder: Folder) => {
  return async (dispatch: any) => {
    await dispatch(pathActions.addFolder({ folder: folder }));
  };
};

export const removeFromPath = () => {
  console.log("Running remove folder from the path");
  return async (dispatch: any) => {
    await dispatch(pathActions.removeFolder());
  };
};

export const clearPath = () => {
  return async (dispatch: any) => {
    await dispatch(pathActions.clear());
  };
};
