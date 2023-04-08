import React from "react";
import { useFile } from "../../context/File";

const FileList: React.FC = () => {
  const files = useFile();

  return (
    <ul>
      {files.map((file) => (
        <li key={file.id}>
          <span>{file.name}</span>
          <span>{file.createdAt}</span>
          <span>{file.updatedAt}</span>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
