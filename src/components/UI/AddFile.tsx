import React, { Fragment, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { FilePicker } from "./FilePicker";
import { addNewFile } from "../../store/actions/file";
import { useDispatch, useSelector } from "react-redux";
import { File } from "../../store/reducers/file";
import { useParams } from "react-router-dom";
import { PathState } from "../../store/reducers/path";
import { generatePath } from "../../utils/pathGenerator";

const ADD_FILE = gql`
  mutation (
    $file: Upload!
    $path: String!
    $folderId: String!
    $subFolderId: String!
  ) {
    singleUpload(
      file: $file
      path: $path
      folderId: $folderId
      subFolderId: $subFolderId
    ) {
      filename
      path
      folderId
      subFolderId
    }
  }
`;

interface AddFileProps {
  isSubFolder: boolean;
}

export const AddFile: React.FC<AddFileProps> = (props): JSX.Element => {
  const [addFile, { error, loading, data }] = useMutation(ADD_FILE);

  const [file, setFile] = useState(null);
  const dispatch: any = useDispatch();
  let subFolderId: string = "";
  let folderId: string = "";

  const { id } = useParams();
  const parentId = id!;

  const onSelectHandler = (file: any) => {
    setFile(file);
  };

  const addNewFileHandler = async (file: File) => {
    await dispatch(addNewFile(file));
  };

  // TODO: dynamically add file path basing file's folder nesting
  const pathArray = useSelector((state: PathState) => state.path.path);
  const path = generatePath(pathArray);

  const addFileHandler = () => {
    if (!file || !path) return;
    addFile({
      variables: {
        file: file,
        path: path,
        folderId: folderId,
        subFolderId: subFolderId,
      },
    });
  };

  useEffect(() => {
    if (props.isSubFolder) {
      subFolderId = parentId;
    } else {
      folderId = parentId;
    }
  }, [file]);

  useEffect(() => {
    const tryAddNewFile = () => {
      if (data?.addFile) {
        addNewFileHandler(data.addFile);
      }
    };
    tryAddNewFile();
  }, [data]);

  return (
    <Fragment>
      {loading && <p>Uploading...</p>}
      {error && <p>{error.message}</p>}
      {/* File preview here */}
      {!file && <FilePicker onSave={onSelectHandler} />}
      {file && <button onClick={addFileHandler}>Upload</button>}
    </Fragment>
  );
};
