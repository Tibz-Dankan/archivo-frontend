import { Folder } from "../store/reducers/folder";

export const generatePath = (pathArray: Folder[]): string => {
  const names = pathArray.map((folder) => folder.name);
  // Join the array of names with `/` as the separator to create the path string
  return names.join("/");
};
