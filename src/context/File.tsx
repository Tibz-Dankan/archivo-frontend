import { createContext, useContext, useState } from "react";

export interface file {
  id: string;
  ownerId: string;
  name: string;
  systemName: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: file[] = [];

const FileContext = createContext<file[]>(initialState);
const UpdateFileContext = createContext<(payload: file[]) => void>(() => {});
const AddFileContext = createContext<(payload: file) => void>(() => {});

export const useFile = () => {
  return useContext<file[]>(FileContext);
};

export const useUpdateFile = (payload: file[]) => {
  return useContext<(payload: file[]) => void>(UpdateFileContext);
};
export const useAddFile = (payload: file) => {
  return useContext<(payload: file) => void>(AddFileContext);
};

interface ProviderProps {
  children: JSX.Element;
}

export const FileProvider: React.FC<ProviderProps> = (props): JSX.Element => {
  const [files, setFiles] = useState<file[]>(initialState);

  const updateFiles = (payload: file[]) => {
    setFiles(payload);
  };

  const addFiles = (payload: file) => {
    setFiles((folders) => [payload, ...folders]);
  };

  return (
    <FileContext.Provider value={files}>
      <UpdateFileContext.Provider value={updateFiles}>
        <AddFileContext.Provider value={addFiles}>
          {props.children}
        </AddFileContext.Provider>
      </UpdateFileContext.Provider>
    </FileContext.Provider>
  );
};
