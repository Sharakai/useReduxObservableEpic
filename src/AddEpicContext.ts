import { createContext, useContext } from "react";
import type { AddEpic } from "./createRootEpic";

export const AddEpicContext = createContext<AddEpic>(() => {
  throw new Error(`
    AddEpic context was not found.
    Please ensure AddEpic.Provider is included at the root of your application.
  `);
});

export const useAddEpic = () => useContext(AddEpicContext);
