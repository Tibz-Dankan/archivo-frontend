import React, { Fragment } from "react";
import { useFolderOne } from "../context/Folder";
import { FindFileByFolderId } from "../components/UI/FindFileByFolderId";
import { FindSubFolderByParentId } from "../components/UI/FindSubFolderByParentId";
import { FileList } from "../components/UI/FileList";
import { SubFolderList } from "../components/UI/SubFolderList";

export const FolderContent: React.FC = () => {
  const folder = useFolderOne();

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
