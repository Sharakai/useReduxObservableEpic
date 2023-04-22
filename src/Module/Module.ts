import { ComponentType } from "react";
import type { Epic } from "redux-observable";

export interface Module {
  Component: ComponentType;
  epic: Epic;
  epicDependencies: Record<string, never>;
}
