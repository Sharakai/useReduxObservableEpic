import { InteropAction } from "../UseEpicConfig";

/** @internal */
export const USE_EPIC_DISPATCH_KEY = "@@USE_EPIC_DISPATCH";

export type EpicDispatch = <A extends InteropAction>(action: A) => A & { [USE_EPIC_DISPATCH_KEY]: true };

export type EpicDispatchedAction = ReturnType<EpicDispatch>;

/** @internal */
export const epicDispatch: EpicDispatch = (action) => ({
  ...action,
  [USE_EPIC_DISPATCH_KEY]: true,
});

/** @internal */
export function isDispatched(action: unknown): action is EpicDispatchedAction {
  return typeof action === "object" && !!action && USE_EPIC_DISPATCH_KEY in action;
}

/** @internal */
export function stripEpicDispatchKey(
  action: EpicDispatchedAction
): Omit<EpicDispatchedAction, typeof USE_EPIC_DISPATCH_KEY> {
  const { [USE_EPIC_DISPATCH_KEY]: _, ...rest } = action;
  return rest;
}
