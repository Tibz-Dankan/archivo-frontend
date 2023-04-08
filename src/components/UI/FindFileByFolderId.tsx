import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useUpdateFile } from "../../context/File";

export interface File {
  id: string;
  ownerId: string;
  name: string;
  url: string;
  systemName: string;
  createdAt: string;
  updatedAt: string;
}

interface QueryData {
  findFileByFolderId: File[];
}

interface props {
  parentId: string;
}

const FIND_FILES_QUERY = gql`
  query ($folderId: ID!) {
    findFileByFolderId(id: $folderId) {
      id
      name
      url
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const FindFileByFolderId: React.FC<props> = (props): JSX.Element => {
  const updateFiles = useUpdateFile([]);
  const parentId = props.parentId;

  const { loading, error, data } = useQuery<QueryData>(FIND_FILES_QUERY, {
    variables: { parentId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  updateFiles(data.findFileByFolderId);

  return <p>Files In Folder</p>;
};
