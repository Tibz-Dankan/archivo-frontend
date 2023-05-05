import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { FolderState } from "../store/reducers/folder";
import { FindFileBySubFolderId } from "../components/UI/FindFileBySubFolderId";
import { FindSubFolderByParentId } from "../components/UI/FindSubFolderByParentId";
import { FileList } from "../components/UI/FileList";
import { SubFolderList } from "../components/UI/SubFolderList";

export const SubFolderContent: React.FC = (): JSX.Element => {
  const subFolder = useSelector(
    (state: FolderState) => state.folder.parentFolder
  );

  // console.log("subFolder");
  // console.log(subFolder);

  return (
    <Fragment>
      <div>
        <FindFileBySubFolderId parentId={subFolder.id} />
        <FindSubFolderByParentId parentId={subFolder.id} />
        <FileList isSubFolder={true} />
        <SubFolderList />
      </div>
    </Fragment>
  );
};
