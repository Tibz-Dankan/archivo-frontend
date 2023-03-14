import React, { useState } from "react";

interface FilePickerProps {
  onSave: () => any;
}

export const FilePicker: React.FC<FilePickerProps> = (props): JSX.Element => {
  const [file, setFile] = useState(null);

  const fileChangeHandler = (event: any): void => {
    //   file validation here (image size)
    console.log(event.target.files);
    setFile(event.target.files[0]);
  };

  props.onSave = () => {
    if (!file) return;
    setFile(file);
  };

  // TODO: add options of cancel file when selected
  return <input type="file" required onChange={fileChangeHandler} />;
};
