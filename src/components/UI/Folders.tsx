import React from "react";
import { useFolder } from "../../context/Folder";

export const Folders: React.FC = () => {
  const folders = useFolder();
  // TODO: provide more standard  styling for the folders
  return (
    <ul>
      {folders.map((folder) => (
        <li key={folder.id}>
          <span>{folder.name}</span>
          <span>{folder.createdAt}</span>
          <span>{folder.updatedAt}</span>
        </li>
      ))}
    </ul>
  );
};
