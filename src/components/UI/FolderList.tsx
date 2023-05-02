import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CreateFolder } from "./CreateFolder";
import { useDispatch, useSelector } from "react-redux";
import { Folder, FolderState } from "../../store/reducers/folder";
import { updateParentFolder } from "../../store/actions/folder";

export const FolderList: React.FC = () => {
  const folders = useSelector((state: FolderState) => state.folder.folders);

  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const updateParentFolderHandler = (folder: Folder) => {
    dispatch(updateParentFolder(folder));
    navigate(`/my-folder-idx/${folder.id}`);
  };

  return (
    <Fragment>
      <div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Owner ID</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {folders.map((folder: Folder, index: number) => (
              <tr
                key={folder.id}
                onClick={() => updateParentFolderHandler(folder)}
              >
                <td>{index + 1}</td>
                <td>{folder.name}</td>
                <td>{folder.ownerId}</td>
                <td>{folder.createdAt}</td>
                <td>{folder.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateFolder />
      </div>
    </Fragment>
  );
};
