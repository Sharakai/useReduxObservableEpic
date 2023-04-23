import { InteropAction } from "../UseEpicConfig";

/** @internal */
const USE_EPIC_DISPATCH_KEY = "@@USE_EPIC_DISPATCH";

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
export function stripEpicDispatchKey<A extends EpicDispatchedAction>(action: A): Omit<A, typeof USE_EPIC_DISPATCH_KEY> {
  const { [USE_EPIC_DISPATCH_KEY]: _, ...rest } = action;
  return rest;
}
