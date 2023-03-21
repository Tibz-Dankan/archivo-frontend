import React, { Fragment, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FilePicker } from "./FilePicker";
const ADD_FILE = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export const AddFile: React.FC = (): JSX.Element => {
  const [addFile, { error, loading, data }] = useMutation(ADD_FILE);

  const [file, setFile] = useState(null);

  const onSelectHandler = (file: any) => {
    setFile(file);
  };

  const addFileHandler = () => {
    if (!file) return;
    addFile({ variables: { file: file } });
  };

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
