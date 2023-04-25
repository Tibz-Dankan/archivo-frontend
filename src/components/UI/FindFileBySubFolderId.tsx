import React from "react";
import { useQuery, gql } from "@apollo/client";
import { File } from "../../store/reducers/file";
import { updateFiles } from "../../store/actions/file";
import { useDispatch } from "react-redux";

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
  const subFolderId = props.parentId;
  const dispatch: any = useDispatch();

  const updateFilesHandler = async (files: File[]) => {
    await dispatch(updateFiles(files));
  };

  const { loading, error, data } = useQuery<QueryData>(FIND_FILES_QUERY, {
    variables: { subFolderId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  updateFilesHandler(data.findFileBySubFolderId);

  return <p>Files In Folder</p>;
};
