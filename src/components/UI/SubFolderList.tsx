import React, { Fragment } from "react";
import { SubFolder, useSubFolder } from "../../context/SubFolder";
import { useUpdateFolderOne } from "../../context/Folder";
import { useNavigate } from "react-router-dom";
import { CreateSubFolder } from "./CreateSubFolder";
import { useFolderOne } from "../../context/Folder";

export const SubFolderList: React.FC = () => {
  const subFolders = useSubFolder();
  const parentFolder = useFolderOne();
  //TODO: provide more styling for the subfolder

  const updateFolderOne = useUpdateFolderOne({
    id: "",
    ownerId: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  });

  const navigate = useNavigate();

  const subFolderUpdateHandler = (payload: SubFolder) => {
    updateFolderOne(payload);
    navigate("/my-sub-folder-idx");
  };

  return (
    <Fragment>
      <div>
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
        <CreateSubFolder parentId={parentFolder.id} />
      </div>
    </Fragment>
  );
};
