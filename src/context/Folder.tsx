import { createContext, useContext, useState } from "react";

export interface Folder {
  id: string;
  ownerId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const folderOneInitialState: Folder = {
  id: "",
  ownerId: "",
  name: "",
  createdAt: "",
  updatedAt: "",
};
const initialState: Folder[] = [];

const FolderOneContext = createContext<Folder>(folderOneInitialState);
const UpdateFolderOneContext = createContext<(payload: Folder) => void>(
  () => {}
);

const FolderContext = createContext<Folder[]>(initialState);
const UpdateFolderContext = createContext<(payload: Folder[]) => void>(
  () => {}
);
const AddFolderContext = createContext<(payload: Folder) => void>(() => {});

export const useFolderOne = () => {
  return useContext<Folder>(FolderOneContext);
};
export const useUpdateFolderOne = (payload: Folder) => {
  return useContext<(payload: Folder) => void>(UpdateFolderOneContext);
};

export const useFolder = () => {
  return useContext<Folder[]>(FolderContext);
};

export const useUpdateFolder = (payload: Folder[]) => {
  return useContext<(payload: Folder[]) => void>(UpdateFolderContext);
};
export const useAddFolder = (payload: Folder) => {
  return useContext<(payload: Folder) => void>(AddFolderContext);
};

interface ProviderProps {
  children: JSX.Element;
}

export const FolderProvider: React.FC<ProviderProps> = (props): JSX.Element => {
  const [folders, setFolders] = useState<Folder[]>(initialState);

  const updateFolders = (payload: Folder[]) => {
    setFolders(payload);
  };

  const addFolder = (payload: Folder) => {
    setFolders((folders) => [payload, ...folders]);
  };

  const [folderOne, setFolderOne] = useState(folderOneInitialState);

  const updateFolderOne = (payload: Folder) => {
    setFolderOne(payload);
  };

  return (
    <FolderContext.Provider value={folders}>
      <UpdateFolderContext.Provider value={updateFolders}>
        <AddFolderContext.Provider value={addFolder}>
          <FolderOneContext.Provider value={folderOne}>
            <UpdateFolderOneContext.Provider value={updateFolderOne}>
              {props.children}
            </UpdateFolderOneContext.Provider>
          </FolderOneContext.Provider>
        </AddFolderContext.Provider>
      </UpdateFolderContext.Provider>
    </FolderContext.Provider>
  );
};
