import { create } from "zustand";

export interface Folder {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export const useFolderStore = create((set) => ({
  folders: [],
  updateFolders: (folders: Folder[]) => set({ folders: folders }),
  AddNewFolder: (folder: Folder) =>
    set((state: any) => ({ folders: [...state.folders, folder] })),
}));

// function BearCounter() {
//     const bears = useBearStore((state) => state.bears)
//     return <h1>{bears} around here ...</h1>
//   }

//   function Controls() {
//     const increasePopulation = useBearStore((state) => state.increasePopulation)
//     return <button onClick={increasePopulation}>one up</button>
//   }
