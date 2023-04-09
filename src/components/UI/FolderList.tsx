import React, { Fragment } from "react";
import { Folder, useFolder, useUpdateFolderOne } from "../../context/Folder";
import { useNavigate } from "react-router-dom";
import { CreateFolder } from "./CreateFolder";

export const FolderList: React.FC = () => {
  const folders = useFolder();

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

  // TODO: provide more standard  styling for the folders(later)
  // TODO: make folders clickable (done)
  // TODO: on folder lead to path "my-folder-idx" (done)
  // TODO: update folder content in the context on the above click (done)
  // TODO: rename this component to FolderList (done)
  // TODO: create another component called "Folder", this component should contain contents updated in the above(done)

  const folderRows = folders.map((folder, index) => (
    <tr key={folder.id} onClick={() => updateFolderHandler(folder)}>
      <td>{index + 1}</td>
      <td>{folder.name}</td>
      <td>{folder.ownerId}</td>
      <td>{folder.createdAt}</td>
      <td>{folder.updatedAt}</td>
    </tr>
  ));

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
          <tbody>{folderRows}</tbody>
        </table>
        <CreateFolder />
      </div>
    </Fragment>
  );
};
