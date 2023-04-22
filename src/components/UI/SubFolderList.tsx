import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CreateSubFolder } from "./CreateSubFolder";
import { updateParentFolder } from "../../store/actions/folder";
import { Folder } from "../../store/folder";
import { useDispatch, useSelector } from "react-redux";

export const SubFolderList: React.FC = () => {
  const subFolders = useSelector((state: any) => state.folder.folders);
  const parentFolder = useSelector((state: any) => state.folder.parentFolder);

  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const updateParentFolderHandler = (folder: Folder) => {
    dispatch(updateParentFolder(folder));
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
