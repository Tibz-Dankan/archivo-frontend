import React, { useState, Fragment } from "react";

interface FilePickerProps {
  onSave: (file: any) => any;
}

export const FilePicker: React.FC<FilePickerProps> = (props): JSX.Element => {
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const validityHandler = (file: any) => {
    console.log("file in validating ");
    console.log(file);
    //TODO:  validate the file size
  };

  const changeHandler = (event: any): void => {
    //   file validation here (image size)
    console.log("event.target.files");
    console.log(event.target.files);
    setFile(event.target.files[0]);
  };

  const saveHandler = () => {
    props.onSave(file);
    console.log(file);
  };

  // TODO: add options of cancel file when selected
  return (
    <Fragment>
      <div>
        {!file && <input type="file" required onChange={changeHandler} />}
        {file && <button onClick={() => saveHandler()}>Done</button>}
      </div>
    </Fragment>
  );
};
