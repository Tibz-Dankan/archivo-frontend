import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CreateFolder } from "./CreateFolder";
import { useDispatch, useSelector } from "react-redux";
import { Folder, FolderState } from "../../store/reducers/folder";
import { updateParentFolder } from "../../store/actions/folder";
import { addToPath } from "../../store/actions/path";
import folderIcon from "../../assets/folder.svg";

export const FolderList: React.FC = () => {
  const folders = useSelector((state: FolderState) => state.folder.folders);

  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const updateParentFolderHandler = (folder: Folder) => {
    dispatch(updateParentFolder(folder));
    dispatch(addToPath(folder));
    navigate(`/my-folder-idx/${folder.id}`);
  };

  return (
    <Fragment>
      <div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Icon</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {folders.map((folder: Folder, index: number) => (
              <tr
                key={folder.id}
                onClick={() => updateParentFolderHandler(folder)}
                className="flex"
              >
                <td>{index + 1}</td>
                <td>
                  <svg className="">
                    <use href={`${folderIcon}#folder`}></use>
                  </svg>
                </td>
                <td>{folder.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateFolder />
      </div>
    </Fragment>
  );
};
