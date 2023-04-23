import React from "react";
import { FileProvider } from "../context/File";
import { UseApolloProvider } from "../hooks/UseApolloProvider";
interface ProviderProps {
  children: JSX.Element;
}

export const Providers: React.FC<ProviderProps> = (props): JSX.Element => {
  return (
    <UseApolloProvider>
      <FileProvider>{props.children}</FileProvider>
    </UseApolloProvider>
  );
};
