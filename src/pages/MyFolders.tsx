import React, { Fragment } from "react";

// import { AddFile } from "../components/UI/AddFile";
// import { CreateFolder } from "../components/UI/CreateFolder";
import { FindFolderByOwnerId } from "../components/UI/FindFolderByOwnerId";
import { FolderList } from "../components/UI/FolderList";

export const MyFolders: React.FC = (): JSX.Element => {
  return (
    <Fragment>
      <FindFolderByOwnerId />
      <FolderList />
    </Fragment>
  );
};
