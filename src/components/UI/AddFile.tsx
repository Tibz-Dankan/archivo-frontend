import React, { Fragment, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FilePicker } from "./FilePicker";
const ADD_FILE = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file) {
      File
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

//// upload file config
// const { ApolloClient } = require('apollo-client')
// const { InMemoryCache } = require('apollo-cache-inmemory')
// const { createUploadLink } = require('apollo-upload-client')

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: createUploadLink()
// })

// // Upload single file
// import { gql, useMutation } from "@apollo/client";

// const MUTATION = gql`
//   mutation ($file: Upload!) {
//     uploadFile(file: $file) {
//       success
//     }
//   }
// `;

// function UploadFile() {
//   const [mutate] = useMutation(MUTATION);

//   function onChange({
//     target: {
//       validity,
//       files: [file],
//     },
//   }) {
//     if (validity.valid) mutate({ variables: { file } });
//   }

//   return <input type="file" required onChange={onChange} />;
// }

// // upload blob
// import { gql, useMutation } from "@apollo/client";

// const MUTATION = gql`
//   mutation ($file: Upload!) {
//     uploadFile(file: $file) {
//       success
//     }
//   }
// `;

// function UploadFile() {
//   const [mutate] = useMutation(MUTATION);

//   function onChange({ target: { validity, value } }) {
//     if (validity.valid) {
//       const file = new Blob([value], { type: "text/plain" });

//       // Optional, defaults to `blob`.
//       file.name = "text.txt";

//       mutate({ variables: { file } });
//     }
//   }

//   return <input type="text" required onChange={onChange} />;
// }
