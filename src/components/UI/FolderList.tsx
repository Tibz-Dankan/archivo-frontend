import React, { Fragment } from "react";
import { Folder, useFolder, useUpdateFolderOne } from "../../context/Folder";
import { useNavigate } from "react-router-dom";
import { CreateFolder } from "./CreateFolder";
import { useFolderStore } from "../../store/folder";
import { useSelector } from "react-redux";

export const FolderList: React.FC = () => {
  const folders = useSelector((state: any) => state.folder.folders);

  const updateFolderOne = useUpdateFolderOne({
    id: "",
    ownerId: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  });

  const navigate = useNavigate();

  const updateFolderHandler = (payload: Folder) => {
    updateFolderOne(payload);
    navigate("/my-folder-idx", { replace: true });
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
            {folders.map((folder: any, index: any) => (
              <tr key={folder.id} onClick={() => updateFolderHandler(folder)}>
                <td>{index + 1}</td>
                <td>{folder.name}</td>
                <td>{folder.ownerId}</td>
                <td>{folder.createdAt}</td>
                <td>{folder.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <CreateFolder /> */}
      </div>
    </Fragment>
  );
};
