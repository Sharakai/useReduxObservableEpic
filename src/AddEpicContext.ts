import { createContext, useContext } from "react";
import type { AddEpic } from "./createRootEpic";

export const AddEpicContext = createContext<AddEpic>(() => {
  throw new Error(`
    AddEpic context was not found.
    Please ensure AddEpicContext.Provider is included within the React component tree using it.
  `);
});

export const useAddEpic = () => useContext(AddEpicContext);
