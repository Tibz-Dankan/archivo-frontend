import React from "react";
import { AuthProvider } from "../context/Auth";
import { FolderProvider } from "../context/Folder";
import { UseApolloProvider } from "../hooks/UseApolloProvider";
interface ProviderProps {
  children: JSX.Element;
}

export const Providers: React.FC<ProviderProps> = (props): JSX.Element => {
  return (
    <UseApolloProvider>
      <AuthProvider>
        <FolderProvider>{props.children}</FolderProvider>
      </AuthProvider>
    </UseApolloProvider>
  );
};
