import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";
import { Auth } from "../../store/reducers/auth";
import { useDispatch } from "react-redux";
import { updateFolders } from "../../store/actions/folder";
import { useSelector } from "react-redux";
import { Folder } from "../../store/reducers/folder";

interface QueryResult {
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

  const { loading, error, data } = useQuery<QueryResult>(
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
            {folders.map((folder: Folder, index: number) => (
              <tr key={folder.id}>
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
