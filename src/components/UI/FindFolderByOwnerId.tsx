import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAuth, Auth } from "../../context/Auth";
import { useDispatch } from "react-redux";
import { updateFolders } from "../../store/actions/folder";
import { useSelector } from "react-redux";

interface Folder {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
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
  const auth: Auth = useSelector((state: any) => state.auth);
  const ownerId: string = auth.user.id;

  const dispatch: any = useDispatch();

  const updateFoldersHandler = async (folders: Folder[]) => {
    await dispatch(updateFolders(folders));
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

  updateFoldersHandler(data.findFolderByOwnerId);

  return (
    <Fragment>
      <div>
        <h3>My Folders</h3>
        {/* <table>
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
        <CreateFolder new={onCreateNewFolder} /> */}
      </div>
    </Fragment>
  );
};
