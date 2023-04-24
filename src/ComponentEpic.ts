import type { StateObservable } from "redux-observable";
import type { Observable, ObservableInput } from "rxjs";
import type { EpicDispatch, EpicDispatchedAction } from "./internal/EpicDispatch";

type InteropAction = Record<keyof any, unknown>;

export interface UseEpicConfig {
  /** Actions */
  A: InteropAction;
  /** State */
  S: unknown;
  /** Dependencies */
  D: unknown;
}

export type ComponentEpic<Value = unknown, EpicConfig extends UseEpicConfig = UseEpicConfig> = (
  action$: Observable<EpicConfig["A"]>,
  state$: StateObservable<EpicConfig["S"]>,
  dependencies: EpicConfig["D"] & { dispatch: EpicDispatch }
) => ObservableInput<Value | EpicDispatchedAction>;
