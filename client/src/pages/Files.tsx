import React from "react";
import { useAuth } from "../context/Auth";

export const File: React.FC = (): JSX.Element => {
  const auth = useAuth();

  console.log("auth in the file component");
  console.log(auth);

  return <div>File</div>;
};
