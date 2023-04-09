import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useUpdateSubFolder } from "../../context/SubFolder";

interface SubFolder {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

interface QueryData {
  findSubFolderByParentId: SubFolder[];
}

interface props {
  parentId: string;
}

const FIND_SUBFOLDERS_QUERY = gql`
  query ($parentId: ID!) {
    findSubFolderByParentId(id: $parentId) {
      id
      name
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const FindSubFolderByParentId: React.FC<props> = (
  props
): JSX.Element => {
  const updateSubFolders = useUpdateSubFolder([]);
  const parentId = props.parentId;

  const { loading, error, data } = useQuery<QueryData>(FIND_SUBFOLDERS_QUERY, {
    variables: { parentId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  //   update subfolders in context
  updateSubFolders(data.findSubFolderByParentId);

  return <p>Sub Folders</p>;
};
