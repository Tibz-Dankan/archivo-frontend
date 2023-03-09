import React from "react";
import { AuthProvider } from "../context/Auth";

interface ProviderProps {
  children: JSX.Element;
}

export const Providers: React.FC<ProviderProps> = (props): JSX.Element => {
  return <AuthProvider>{props.children}</AuthProvider>;
};
