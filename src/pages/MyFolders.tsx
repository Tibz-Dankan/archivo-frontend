import React, { Fragment } from "react";
import { useAuth } from "../context/Auth";
// import { AddFile } from "../components/UI/AddFile";
// import { CreateFolder } from "../components/UI/CreateFolder";
import { FindFolderByOwnerId } from "../components/UI/FindFolderByOwnerId";
import { Folders } from "../components/UI/Folders";

export const MyFolders: React.FC = (): JSX.Element => {
  const auth = useAuth();

  return (
    <Fragment>
      <FindFolderByOwnerId />
      <Folders />
    </Fragment>
  );
};
