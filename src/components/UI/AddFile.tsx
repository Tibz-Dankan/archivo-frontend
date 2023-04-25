import React, { Fragment, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { FilePicker } from "./FilePicker";
import { addNewFile } from "../../store/actions/file";
import { useDispatch } from "react-redux";
import { File } from "../../store/reducers/file";

const ADD_FILE = gql`
  mutation ($file: Upload!, $path: String!) {
    singleUpload(file: $file, path: $path) {
      filename
      path
    }
  }
`;

export const AddFile: React.FC = (): JSX.Element => {
  const [addFile, { error, loading, data }] = useMutation(ADD_FILE);

  const [file, setFile] = useState(null);
  const dispatch: any = useDispatch();

  const onSelectHandler = (file: any) => {
    setFile(file);
  };

  const addNewFileHandler = async (file: File) => {
    await dispatch(addNewFile(file));
  };

  // TODO: dynamically add file path basing file's folder nesting

  const addFileHandler = () => {
    if (!file) return;
    addFile({ variables: { file: file, path: "Testing" } });
  };

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
