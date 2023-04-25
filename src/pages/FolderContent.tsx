import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { FolderState } from "../store/reducers/folder";
import { FindFileByFolderId } from "../components/UI/FindFileByFolderId";
import { FindSubFolderByParentId } from "../components/UI/FindSubFolderByParentId";
import { FileList } from "../components/UI/FileList";
import { SubFolderList } from "../components/UI/SubFolderList";

export const FolderContent: React.FC = () => {
  const folder = useSelector((state: FolderState) => state.folder.parentFolder);

  console.log("folder");
  console.log(folder);

  return (
    <Fragment>
      <div>
        <FindFileByFolderId parentId={folder.id} />
        <FindSubFolderByParentId parentId={folder.id} />
        <FileList />
        <SubFolderList />
      </div>
    </Fragment>
  );
};
