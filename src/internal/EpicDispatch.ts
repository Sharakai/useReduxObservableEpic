import type { Action } from "redux";

/** @internal */
export const USE_EPIC_DISPATCH_KEY = Symbol.for("USE_EPIC_DISPATCH");

export type EpicDispatch = <A extends Action>(action: A) => { [USE_EPIC_DISPATCH_KEY]: true; action: A };

export type EpicDispatchedAction = ReturnType<EpicDispatch>;

/** @internal */
export const epicDispatch: EpicDispatch = (action) => ({
  [USE_EPIC_DISPATCH_KEY]: true,
  action,
});

/** @internal */
export function isDispatched(action: unknown): action is EpicDispatchedAction {
  return typeof action === "object" && !!action && USE_EPIC_DISPATCH_KEY in action;
}
