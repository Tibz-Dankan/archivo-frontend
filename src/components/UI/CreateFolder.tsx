import React, { useState, useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useAuth, Auth } from "../../context/Auth";
import { Folder, useAddFolder } from "../../context/Folder";

interface Props {
  new: (folder: Folder) => void;
}

const CREATE_FOLDER = gql`
  mutation ($ownerId: String!, $name: String!) {
    createFolder(ownerId: $ownerId, name: $name) {
      id
      name
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const CreateFolder: React.FC<Props> = (props) => {
  const [createFolder, { loading, error, data }] = useMutation(CREATE_FOLDER);
  const nameRef = useRef<HTMLInputElement>(null);

  const auth: Auth = useAuth();
  const userId: string = auth.user.id;
  console.log("userId");
  console.log(userId);

  const addFolder = useAddFolder({
    id: "",
    name: "",
    ownerId: "",
    createdAt: "",
    updatedAt: "",
  });

  const addFolderHandler = (payload: Folder) => {
    console.log("payload");
    console.log(payload);
    addFolder(payload);
  };

  const newFolderHandler = (folder: Folder) => {
    props.new(folder);
  };

  const createFolderHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    if (!name || !userId) return;
    try {
      await createFolder({
        variables: {
          ownerId: userId,
          name: name,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const saveNewFolder = () => {
      if (data) {
        newFolderHandler(data.createFolder);
      }
    };
    saveNewFolder();
  }, [data]);

  return (
    <form onSubmit={(event) => createFolderHandler(event)}>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <input
        type="text"
        ref={nameRef}
        placeholder="Enter folder name"
        required
      />
      <button type="submit">Create Folder</button>
    </form>
  );
};
