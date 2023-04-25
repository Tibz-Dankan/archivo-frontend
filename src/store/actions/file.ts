import { fileActions } from "../index";

import { File } from "../reducers/file";

export const updateFiles = (files: File[]) => {
  return async (dispatch: any) => {
    await dispatch(fileActions.update({ files: files }));
  };
};

export const addNewFile = (file: File) => {
  return async (dispatch: any) => {
    await dispatch(fileActions.addNew({ newFile: file }));
  };
};

export const clearAllFiles = () => {
  return async (dispatch: any) => {
    await dispatch(fileActions.clear());
  };
};
