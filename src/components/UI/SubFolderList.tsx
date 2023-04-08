import React from "react";
import {
  SubFolder,
  useSubFolder,
  useUpdateSubFolderOne,
} from "../../context/SubFolder";
import { useNavigate } from "react-router-dom";

export const SubFolderList: React.FC = () => {
  const subFolders = useSubFolder();
  //TODO: provide more styling for the subfolder

  const updateSubFolderOne = useUpdateSubFolderOne({
    id: "",
    ownerId: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  });

  const navigate = useNavigate();

  const subFolderUpdateHandler = (payload: SubFolder) => {
    updateSubFolderOne(payload);
    navigate("/my-sub-folder-idx");
  };

  return (
    <ul>
      {subFolders.map((subFolder) => (
        <li
          key={subFolder.id}
          onClick={() => subFolderUpdateHandler(subFolder)}
        >
          <span>{subFolder.name}</span>
          <span>{subFolder.createdAt}</span>
          <span>{subFolder.updatedAt}</span>
        </li>
      ))}
    </ul>
  );
};
