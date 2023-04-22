import { createContext, useContext } from "react";
import type { Epic } from "redux-observable";

export type AddEpic = (epic: Epic) => void;

export const AddEpic = createContext<AddEpic>(() => {
  throw new Error(`
    AddEpic context was not found.
    Please ensure AddEpic.Provider is included at the root of your application.
  `);
});

export const useAddEpic = () => useContext(AddEpic);
