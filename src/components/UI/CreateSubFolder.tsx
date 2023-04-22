import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { addNewFolder } from "../../store/actions/folder";
import { Folder } from "../../store/reducers/folder";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

interface props {
  parentId: string;
}

const CREATE_SUB_FOLDER = gql`
  mutation ($ownerId: String!, $name: String!, $parentId: String!) {
    createSubFolder(ownerId: $ownerId, name: $name, parentId: $parentId) {
      id
      name
      ownerId
      subFolderParentId
      createdAt
      updatedAt
    }
  }
`;

export const CreateSubFolder: React.FC<props> = (props) => {
  const [createSubFolder, { loading, error, data }] =
    useMutation(CREATE_SUB_FOLDER);
  const [folderName, setFolderName] = useState("");
  const userId = useSelector((state: any) => state.auth.user.id);

  const { id } = useParams();
  const parentId = id;
  const dispatch: any = useDispatch();

  const addNewFolderHandler = async (folders: Folder) => {
    await dispatch(addNewFolder(folders));
  };

  const folderNameChangeHandler = (event: any) => {
    setFolderName(event.target.value);
  };

  const createSubFolderHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!folderName || !userId || !parentId) return;
    try {
      await createSubFolder({
        variables: {
          ownerId: userId,
          name: folderName,
          parentId: parentId,
        },
      });
      setFolderName("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const addNewFolder = () => {
      if (data?.createSubFolder) {
        addNewFolderHandler(data.createSubFolder);
      }
    };
    addNewFolder();
  }, [data]);

  return (
    <form onSubmit={(event) => createSubFolderHandler(event)}>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <input
        type="text"
        value={folderName}
        onChange={(event) => folderNameChangeHandler(event)}
        placeholder="Enter sub folder name"
        required
      />
      <button type="submit">Create Sub Folder</button>
    </form>
  );
};
