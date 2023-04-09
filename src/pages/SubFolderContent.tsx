import React, { Fragment } from "react";
import { useSubFolderOne } from "../context/SubFolder";
import { useFolderOne } from "../context/Folder";
import { FindFileBySubFolderId } from "../components/UI/FindFileBySubFolderId";
import { FindSubFolderByParentId } from "../components/UI/FindSubFolderByParentId";
import { FileList } from "../components/UI/FileList";
import { SubFolderList } from "../components/UI/SubFolderList";

export const SubFolderContent: React.FC = (): JSX.Element => {
  // const subFolder = useSubFolderOne();
  const subFolder = useFolderOne();

  console.log("subFolder");
  console.log(subFolder);

  return (
    <Fragment>
      <div>
        <FindFileBySubFolderId parentId={subFolder.id} />
        <FindSubFolderByParentId parentId={subFolder.id} />
        <FileList />
        <SubFolderList />
      </div>
    </Fragment>
  );
};
