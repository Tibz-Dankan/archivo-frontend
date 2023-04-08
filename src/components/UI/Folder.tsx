import React from "react";
import { useFolderOne } from "../../context/Folder";

export const Folder = () => {
  const folder = useFolderOne();
  console.log(folder);
  // make a query fetching files
  // make a query fetching children folder
  return <div>Folder</div>;
};
