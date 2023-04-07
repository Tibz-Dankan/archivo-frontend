import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useAuth, Auth } from "../../context/Auth";
import { useUpdateFolder } from "../../context/Folder";

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
  const auth: Auth = useAuth();
  const ownerId: string = auth.user.id;
  console.log("ownerId/UserId");
  console.log(ownerId);
  const updateFolders = useUpdateFolder([]);

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

  updateFolders(data.findFolderByOwnerId);

  return <>My Folders</>;
};
