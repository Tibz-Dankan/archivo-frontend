import { createContext, useContext, useState } from "react";

export interface Folder {
  id: string;
  ownerId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: Folder[] = [];

const FolderContext = createContext<Folder[]>(initialState);
const UpdateFolderContext = createContext<(payload: Folder[]) => void>(
  () => {}
);
const AddFolderContext = createContext<(payload: Folder) => void>(() => {});

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

  return (
    <FolderContext.Provider value={folders}>
      <UpdateFolderContext.Provider value={updateFolders}>
        <AddFolderContext.Provider value={addFolder}>
          {props.children}
        </AddFolderContext.Provider>
      </UpdateFolderContext.Provider>
    </FolderContext.Provider>
  );
};
