import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CreateSubFolder } from "./CreateSubFolder";
import { updateParentFolder } from "../../store/actions/folder";
import { Folder, FolderState } from "../../store/reducers/folder";
import { useDispatch, useSelector } from "react-redux";
import { addToPath } from "../../store/actions/path";

export const SubFolderList: React.FC = () => {
  const subFolders = useSelector((state: FolderState) => state.folder.folders);
  const parentFolder = useSelector(
    (state: FolderState) => state.folder.parentFolder
  );

  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const updateParentFolderHandler = (folder: Folder) => {
    dispatch(updateParentFolder(folder));
    dispatch(addToPath(folder));
    navigate(`/my-sub-folder-idx/${folder.id}`);
  };

  return (
    <Fragment>
      <div>
        <ul>
          {subFolders.map((subFolder: Folder) => (
            <li
              key={subFolder.id}
              onClick={() => updateParentFolderHandler(subFolder)}
            >
              <span>{subFolder.name}</span>
              <span>{subFolder.createdAt}</span>
              <span>{subFolder.updatedAt}</span>
            </li>
          ))}
        </ul>
        <CreateSubFolder parentId={parentFolder.id} />
      </div>
    </Fragment>
  );
};
