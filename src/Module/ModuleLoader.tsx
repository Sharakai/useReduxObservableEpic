import { FC, useCallback } from "react";
import type { ComponentEpic } from "../ComponentEpic";
import { useEpicEffect } from "../useEpicEffect";
import type { Module } from "./Module";

export const ModuleLoader: FC<Module> = ({
  Component,
  epic,
  epicDependencies,
}) => {
  const moduleEpic: ComponentEpic = useCallback(
    (action$, state$, dependencies) =>
      epic(action$, state$, { ...dependencies, ...epicDependencies }),
    [epic, epicDependencies]
  );
  useEpicEffect(moduleEpic);

  return <Component />;
};
