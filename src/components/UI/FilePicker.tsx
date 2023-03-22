import React, { useState, Fragment, useEffect } from "react";
import { FileValidator } from "../../utils/fileValidator";

interface FilePickerProps {
  onSave: (file: any) => any;
}

export const FilePicker: React.FC<FilePickerProps> = (props): JSX.Element => {
  const [file, setFile] = useState<any>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isImage, setIsImage] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<string | undefined>("");
  const [imageURL, setImageURL] = useState<string | any>("");

  const validateHandler = (file: any) => {
    if (!file) return;
    try {
      const fileValidator = new FileValidator(file);
      setFileSize(fileValidator.size());
      if (fileValidator.isImage()) {
        setIsImage(true);
      }
      return fileValidator.valid();
    } catch (err: any) {
      setIsImage(false);
      if (err) setError(err.message);
    }
  };

  const changeHandler = (event: any): void => {
    setFile(event.target.files[0]);
  };

  const saveHandler = () => {
    validateHandler(file) && props.onSave(file);
  };

  const imageURLHandler = (): void => {
    if (!file && !isImage) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageURL(reader.result);
    };
  };

  useEffect(() => {
    imageURLHandler();
    validateHandler(file);
  }, [file, setFile]);

  // TODO: add options of cancel file when selected
  return (
    <Fragment>
      <div>
        {error && <p>{error}</p>}
        {!file && <input type="file" required onChange={changeHandler} />}
        {file && (
          <div>
            <div>
              {isImage && <img src={imageURL} alt={file.name} />}
              {!isImage && <span>Custom file Icon</span>}
              <p>Name: {file.name}</p>
              <p>Size: {fileSize}</p>
            </div>
            <button onClick={() => saveHandler()}>Continue</button>
          </div>
        )}
      </div>
    </Fragment>
  );
};
