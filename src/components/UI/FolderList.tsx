import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CreateFolder } from "./CreateFolder";
import { useDispatch, useSelector } from "react-redux";
import { Folder, FolderState } from "../../store/reducers/folder";
import { updateParentFolder } from "../../store/actions/folder";
import { addToPath } from "../../store/actions/path";
import folderIcon from "../../assets/folder.svg";
import ctl from "@netlify/classnames-template-literals";

export const FolderList: React.FC = () => {
  const folders = useSelector((state: FolderState) => state.folder.folders);

  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const updateParentFolderHandler = (folder: Folder) => {
    dispatch(updateParentFolder(folder));
    dispatch(addToPath(folder));
    navigate(`/my-folder-idx/${folder.id}`);
  };

  // TODO: To color folder icons using tailwind

  return (
    <Fragment>
      <div>
        <div className="w-full">
          {folders.map((folder: Folder, index: number) => (
            <div
              key={folder.id}
              onClick={() => updateParentFolderHandler(folder)}
              // className={folderListClasses}
              className="bg-green-500"
            >
              {/* <span>{index + 1}</span> */}
              <span>
                <svg className="">
                  <use href={`${folderIcon}#folder`}></use>
                </svg>
              </span>
              <span>{folder.name}</span>
            </div>
          ))}
        </div>
        <CreateFolder />
      </div>
    </Fragment>
  );
};

const folderListClasses = ctl(`
 bg-green-400
   flex justify-start align-center
`);

// TODO: get tailwind config right
// Involve Cracco
