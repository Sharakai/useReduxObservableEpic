import type { StateObservable } from "redux-observable";
import type { Observable, ObservableInput } from "rxjs";
import type { UseEpicConfig } from "./UseEpicConfig";
import type { EpicDispatch, EpicDispatchedAction } from "./internal/EpicDispatch";

export type ComponentEpic<Value = unknown, EpicConfig extends UseEpicConfig = UseEpicConfig> = (
  action$: Observable<EpicConfig["A"]>,
  state$: StateObservable<EpicConfig["S"]>,
  dependencies: EpicConfig["D"] & { dispatch: EpicDispatch }
) => ObservableInput<Value | EpicDispatchedAction>;
