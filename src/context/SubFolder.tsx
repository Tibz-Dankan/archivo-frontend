import { createContext, useContext, useState } from "react";

export interface SubFolder {
  id: string;
  ownerId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
const folderOneInitialState: SubFolder = {
  id: "",
  ownerId: "",
  name: "",
  createdAt: "",
  updatedAt: "",
};

const initialState: SubFolder[] = [];

const SubFolderOneContext = createContext<SubFolder>(folderOneInitialState);
const UpdateSubFolderOneContext = createContext<(payload: SubFolder) => void>(
  () => {}
);

const SubFolderContext = createContext<SubFolder[]>(initialState);
const UpdateSubFolderContext = createContext<(payload: SubFolder[]) => void>(
  () => {}
);
const AddSubFolderContext = createContext<(payload: SubFolder) => void>(
  () => {}
);

export const useSubFolderOne = () => {
  return useContext<SubFolder>(SubFolderOneContext);
};
export const useUpdateSubFolderOne = (payload: SubFolder) => {
  return useContext<(payload: SubFolder) => void>(UpdateSubFolderOneContext);
};

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

  const [subFolderOne, setSubFolderOne] = useState(folderOneInitialState);

  const updateSubFolderOne = (payload: SubFolder) => {
    setSubFolderOne(payload);
  };

  return (
    <SubFolderContext.Provider value={folders}>
      <UpdateSubFolderContext.Provider value={updateSubFolders}>
        <AddSubFolderContext.Provider value={addSubFolder}>
          <SubFolderOneContext.Provider value={subFolderOne}>
            <UpdateSubFolderOneContext.Provider value={updateSubFolderOne}>
              {props.children}
            </UpdateSubFolderOneContext.Provider>
          </SubFolderOneContext.Provider>
        </AddSubFolderContext.Provider>
      </UpdateSubFolderContext.Provider>
    </SubFolderContext.Provider>
  );
};
