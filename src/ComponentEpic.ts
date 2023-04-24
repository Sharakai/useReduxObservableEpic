import type { Action } from "redux";
import type { StateObservable } from "redux-observable";
import type { Observable, ObservableInput } from "rxjs";
import type { EpicDispatch, EpicDispatchedAction } from "./internal/EpicDispatch";

type AnyObject = Record<keyof never, unknown>;

export interface UseEpicConfig {
  /** Actions */
  A: Action;
  /** State */
  S: AnyObject;
  /** Dependencies */
  D: AnyObject;
}

export type ComponentEpic<Value = unknown, EpicConfig extends UseEpicConfig = UseEpicConfig> = (
  action$: Observable<EpicConfig["A"]>,
  state$: StateObservable<EpicConfig["S"]>,
  dependencies: EpicConfig["D"] & { dispatch: EpicDispatch }
) => ObservableInput<Value | EpicDispatchedAction>;
