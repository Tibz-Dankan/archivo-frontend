import React, { useState, Fragment } from "react";
import { FileValidator } from "../../utils/fileValidator";

interface FilePickerProps {
  onSave: (file: any) => any;
}

export const FilePicker: React.FC<FilePickerProps> = (props): JSX.Element => {
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const validateHandler = (file: any) => {
    try {
      const fileValidator = new FileValidator(file);
      // fileValidator.valid();
      fileValidator.isImage();
    } catch (err: any) {
      if (err) setError(err.message);
    }
  };

  const changeHandler = (event: any): void => {
    setFile(event.target.files[0]);
  };

  const saveHandler = () => {
    validateHandler(file);
    props.onSave(file);
  };

  // TODO: add options of cancel file when selected
  return (
    <Fragment>
      <div>
        {error && <p>{error}</p>}
        {!file && <input type="file" required onChange={changeHandler} />}
        {file && <button onClick={() => saveHandler()}>Done</button>}
      </div>
    </Fragment>
  );
};
