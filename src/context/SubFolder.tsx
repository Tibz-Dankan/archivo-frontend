import { createContext, useContext, useState } from "react";

export interface SubFolder {
  id: string;
  ownerId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: SubFolder[] = [];

const SubFolderContext = createContext<SubFolder[]>(initialState);
const UpdateSubFolderContext = createContext<(payload: SubFolder[]) => void>(
  () => {}
);
const AddSubFolderContext = createContext<(payload: SubFolder) => void>(
  () => {}
);

export const useSubFolder = () => {
  return useContext<SubFolder[]>(SubFolderContext);
};

export const useUpdateSubFolder = (payload: SubFolder[]) => {
  return useContext<(payload: SubFolder[]) => void>(UpdateSubFolderContext);
};
export const useAddSubFolder = (payload: SubFolder) => {
  return useContext<(payload: SubFolder) => void>(AddSubFolderContext);
};

interface ProviderProps {
  children: JSX.Element;
}

export const SubFolderProvider: React.FC<ProviderProps> = (
  props
): JSX.Element => {
  const [folders, setFolders] = useState<SubFolder[]>(initialState);

  const updateSubFolders = (payload: SubFolder[]) => {
    setFolders(payload);
  };

  const addSubFolder = (payload: SubFolder) => {
    setFolders((folders) => [payload, ...folders]);
  };

  return (
    <SubFolderContext.Provider value={folders}>
      <UpdateSubFolderContext.Provider value={updateSubFolders}>
        <AddSubFolderContext.Provider value={addSubFolder}>
          {props.children}
        </AddSubFolderContext.Provider>
      </UpdateSubFolderContext.Provider>
    </SubFolderContext.Provider>
  );
};
