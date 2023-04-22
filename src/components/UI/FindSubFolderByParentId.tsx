import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { updateFolders } from "../../store/actions/folder";
import { Folder } from "../../store/reducers/folder";
import { useDispatch } from "react-redux";

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
  const { id } = useParams();
  const parentId = id;

  const dispatch: any = useDispatch();

  const updateFoldersHandler = async (folders: Folder[]) => {
    await dispatch(updateFolders(folders));
  };

  const { loading, error, data } = useQuery<QueryData>(FIND_SUBFOLDERS_QUERY, {
    variables: { parentId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  updateFoldersHandler(data.findSubFolderByParentId);

  return <p>Sub Folders</p>;
};
