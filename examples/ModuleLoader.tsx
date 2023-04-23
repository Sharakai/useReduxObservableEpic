import { type ComponentType, useCallback, type FC } from "react";
import type { Epic } from "redux-observable";
import { useEpicEffect, type ComponentEpic } from "use-redux-observable-epic";

export interface Module {
  Component: ComponentType;
  epic: Epic;
  epicDependencies: Record<string, never>;
}

export const ModuleLoader: FC<Module> = ({ Component, epic, epicDependencies }) => {
  const moduleEpic: ComponentEpic = useCallback(
    (action$, state$, dependencies) => epic(action$, state$, { ...dependencies, ...epicDependencies }),
    [epic, epicDependencies]
  );
  useEpicEffect(moduleEpic);

  return <Component />;
};
