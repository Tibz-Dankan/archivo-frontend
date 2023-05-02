import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { FileState } from "../../store/reducers/file";
import { AddFile } from "./AddFile";

interface FileProps {
  isSubFolder: boolean;
}

export const FileList: React.FC<FileProps> = (props) => {
  const files = useSelector((state: FileState) => state.file.files);

  return (
    <Fragment>
      <div>
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <span>{file.name}</span>
              <span>{file.createdAt}</span>
              <span>{file.updatedAt}</span>
            </li>
          ))}
        </ul>
        <AddFile isSubFolder={props.isSubFolder} />
      </div>
    </Fragment>
  );
};
