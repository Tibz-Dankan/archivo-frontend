import React from "react";
import { useSubFolder } from "../../context/SubFolder";

export const SubFolders: React.FC = () => {
  const subFolders = useSubFolder();
  //TODO: get files from context
  //TODO: provide more styling for the subfolder

  return (
    // Files here
    <ul>
      {subFolders.map((subFolder) => (
        <li key={subFolder.id}>
          <span>{subFolder.name}</span>
          <span>{subFolder.createdAt}</span>
          <span>{subFolder.updatedAt}</span>
        </li>
      ))}
    </ul>
  );
};
