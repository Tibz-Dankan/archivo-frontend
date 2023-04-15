import React, { Fragment, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAuth, Auth } from "../../context/Auth";
import { useUpdateFolder } from "../../context/Folder";
import { useUpdateFolderOne } from "../../context/Folder";
import { useNavigate } from "react-router-dom";
import { CreateFolder } from "./CreateFolder";

interface Folder {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
interface folderObj {
  data: Folder[];
}

interface FindFolderByOwnerIdQueryResult {
  findFolderByOwnerId: Folder[];
}

const FIND_FOLDER_BY_OWNER_ID = gql`
  query findFolderByOwnerId($ownerId: ID!) {
    findFolderByOwnerId(id: $ownerId) {
      id
      name
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const FindFolderByOwnerId: React.FC = () => {
  const auth: Auth = useAuth();
  const ownerId: string = auth.user.id;
  let folders: Folder[] = [];

  const folderObj: folderObj = { data: [] };
  const updateFolders = useUpdateFolder([]);
  const navigate = useNavigate();

  const updateFolderOne = useUpdateFolderOne({
    id: "",
    ownerId: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  });

  const updateFolderHandler = (payload: Folder) => {
    updateFolderOne(payload);
    navigate("/my-folder-idx", { replace: true });
  };

  const { loading, error, data } = useQuery<FindFolderByOwnerIdQueryResult>(
    FIND_FOLDER_BY_OWNER_ID,
    {
      variables: { ownerId },
    }
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data || !data.findFolderByOwnerId) {
    return <p>No folders found.</p>;
  }

  // folders = data.findFolderByOwnerId;
  folderObj.data = data.findFolderByOwnerId;

  const onCreateNewFolder = (folder: Folder) => {
    console.log("new folder");
    console.log(folder);
    // folders = [...folders, folder];

    // folderObj.data = [...folderObj.data, folder];
    // console.log("new folder added");
    // console.log(folderObj);
  };
  // console.log("new folder added out side function value");
  // console.log(folderObj);

  return (
    <Fragment>
      <div>
        <h3>My Folders</h3>
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
            {folderObj.data.map((folder, index) => (
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
        <CreateFolder new={onCreateNewFolder} />
      </div>
    </Fragment>
  );
};
