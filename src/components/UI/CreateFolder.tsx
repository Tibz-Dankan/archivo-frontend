import React, { useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Folder } from "../../context/Folder";
import { addNewFolder } from "../../store/actions/folder";
import { useDispatch, useSelector } from "react-redux";

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

export const CreateFolder: React.FC = () => {
  const [createFolder, { loading, error, data }] = useMutation(CREATE_FOLDER);
  const nameRef = useRef<HTMLInputElement>(null);

  const userId: string = useSelector((state: any) => state.auth.user.id);

  const dispatch: any = useDispatch();

  const addFolderHandler = async (folder: Folder) => {
    await dispatch(addNewFolder(folder));
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
    const addNewFolder = () => {
      if (data?.createFolder) {
        addFolderHandler(data.createFolder);
        data.createFolder = null;
      }
    };
    addNewFolder();
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
