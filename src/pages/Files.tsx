import React, { Fragment } from "react";
import { useAuth } from "../context/Auth";
import { AddFile } from "../components/UI/AddFile";
import { CreateFolder } from "../components/UI/CreateFolder";

export const File: React.FC = (): JSX.Element => {
  const auth = useAuth();

  console.log("auth in the file component");
  console.log(auth);

  return (
    <Fragment>
      <div>File</div>
      <AddFile />
      <CreateFolder />
    </Fragment>
  );
};
