import React from "react";
import { useQuery, gql } from "@apollo/client";
// fix the error here
interface Folder {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

interface QueryData {
  findSubFolderByOwnerId: Folder[];
}

interface Props {
  ownerId: string;
}

const FIND_SUBFOLDERS_QUERY = gql`
  query FindSubfoldersByOwnerId($ownerId: ID!) {
    findSubFolderByOwnerId(id: $ownerId) {
      id
      name
      ownerId
      createdAt
      updatedAt
    }
  }
`;

const FindSubFolderByOwnerId: React.FC<Props> = ({ ownerId }): JSX.Element => {
  const { loading, error, data } =
    useQuery <
    QueryData >
    (FIND_SUBFOLDERS_QUERY,
    {
      variables: { ownerId },
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <ul>
      {data.findSubFolderByOwnerId.map((folder) => (
        <li key={folder.id}>
          <span>{folder.name}</span>
          <span>{folder.createdAt}</span>
          <span>{folder.updatedAt}</span>
        </li>
      ))}
    </ul>
  );
};

export default FindSubFolderByOwnerId;
