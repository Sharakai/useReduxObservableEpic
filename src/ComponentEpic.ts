import type { StateObservable } from "redux-observable";
import type { Observable, ObservableInput } from "rxjs";
import type { InteropAction, UseEpicConfig } from "./UseEpicConfig";

export const USE_EPIC_DISPATCH_KEY = "@@USE_EPIC_DISPATCH";

export type EpicDispatch = (
  action: InteropAction
) => InteropAction & { [USE_EPIC_DISPATCH_KEY]: true };
export type EpicDispatchedAction = ReturnType<EpicDispatch>;

export type ComponentEpic<
  Value = unknown,
  EpicConfig extends UseEpicConfig = UseEpicConfig
> = (
  action$: Observable<EpicConfig["A"]>,
  state$: StateObservable<EpicConfig["S"]>,
  dependencies: EpicConfig["D"] & { dispatch: EpicDispatch }
) => ObservableInput<Value | EpicDispatchedAction>;
