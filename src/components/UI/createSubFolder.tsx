import React, { useState, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAuth, Auth } from "../../context/Auth";
import { SubFolder, useAddSubFolder } from "../../context/SubFolder";

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
  const nameRef = useRef<HTMLInputElement>(null);

  const auth: Auth = useAuth();
  const userId: string = auth.user.id;
  console.log("userId");
  console.log(userId);

  const addSubFolder = useAddSubFolder({
    id: "",
    name: "",
    ownerId: "",
    createdAt: "",
    updatedAt: "",
  });

  const addSubFolderHandler = (payload: SubFolder) => {
    console.log("payload");
    console.log(payload);
    addSubFolder(payload);
  };

  const createSubFolderHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const parentId = props.parentId;
    if (!name || !userId || !parentId) return;
    try {
      await createSubFolder({
        variables: {
          ownerId: userId,
          name: name,
          parentId: parentId,
        },
      });
      if (data) {
        addSubFolderHandler(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={(event) => createSubFolderHandler(event)}>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <input
        type="text"
        ref={nameRef}
        placeholder="Enter sub folder name"
        required
      />
      <button type="submit">Create Sub Folder</button>
    </form>
  );
};
