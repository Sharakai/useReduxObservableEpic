import { type ComponentType, useCallback, type FC } from "react";
import type { Epic } from "redux-observable";
import { useEpic } from "use-redux-observable-epic";

export interface Module {
  Component: ComponentType;
  epic: Epic;
  moduleServices: Record<string, never>;
}

export const ModuleLoader: FC<Module> = ({ Component, epic, moduleServices }) => {
  const moduleEpic: Epic = useCallback(
    (action$, state$, dependencies) => epic(action$, state$, { ...dependencies, ...moduleServices }),
    [epic, moduleServices]
  );
  useEpic(moduleEpic);

  return <Component />;
};
