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
  findFileBySubFolderId: File[];
}

interface props {
  parentId: string;
}

const FIND_FILES_QUERY = gql`
  query ($subFolderId: ID!) {
    findFileBySubFolderId(id: $subFolderId) {
      id
      name
      url
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const FindFileBySubFolderId: React.FC<props> = (props): JSX.Element => {
  const updateFiles = useUpdateFile([]);
  const subFolderId = props.parentId;

  const { loading, error, data } = useQuery<QueryData>(FIND_FILES_QUERY, {
    variables: { subFolderId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  updateFiles(data.findFileBySubFolderId);

  return <p>Files In Folder</p>;
};
