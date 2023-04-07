import React from "react";
import { AuthProvider } from "../context/Auth";
import { FolderProvider } from "../context/Folder";
import { SubFolderProvider } from "../context/SubFolder";
import { UseApolloProvider } from "../hooks/UseApolloProvider";
interface ProviderProps {
  children: JSX.Element;
}

export const Providers: React.FC<ProviderProps> = (props): JSX.Element => {
  return (
    <UseApolloProvider>
      <AuthProvider>
        <FolderProvider>
          <SubFolderProvider>{props.children}</SubFolderProvider>
        </FolderProvider>
      </AuthProvider>
    </UseApolloProvider>
  );
};
