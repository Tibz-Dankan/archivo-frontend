import React from "react";
import { useFolder } from "../../context/Folder";

export const Folders: React.FC = () => {
  const folders = useFolder();

  // TODO: provide more standard  styling for the folders
  // TODO: make folders clickable
  // TODO: on folder lead to path "my-folder-idx"
  // TODO: update folder content in the context on the above click
  // TODO: rename this component to FolderList
  // TODO: create another component called "Folder", this component should contain contents updated in the above

  const folderRows = folders.map((folder) => (
    <tr key={folder.id}>
      <td>{folder.id}</td>
      <td>{folder.name}</td>
      <td>{folder.ownerId}</td>
      <td>{folder.createdAt}</td>
      <td>{folder.updatedAt}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Owner ID</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>{folderRows}</tbody>
    </table>
  );
};
