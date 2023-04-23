import { USE_EPIC_DISPATCH_KEY, epicDispatch, isDispatched, stripEpicDispatchKey } from "./EpicDispatch";

describe("epicDispatch", () => {
  it(`should add the ${USE_EPIC_DISPATCH_KEY} property to the action`, () => {
    const action = { type: "test-type", payload: { a: 1, b: "b" } };
    const result = epicDispatch(action);
    expect(result).toHaveProperty(USE_EPIC_DISPATCH_KEY);
    expect(result).toEqual({ ...action, [USE_EPIC_DISPATCH_KEY]: true });
  });
});

describe("isDispatched", () => {
  it("should return true for a dispatch action", () => {
    const action = { type: "test-action", [USE_EPIC_DISPATCH_KEY]: true } as const;
    expect(isDispatched(action)).toBe(true);
  });

  it("should return false for a non-dispatched action", () => {
    const action = { type: "test-action" };
    expect(isDispatched(action)).toBe(false);
  });

  it("should return false for a non-action", () => {
    expect(isDispatched("Not an action")).toBe(false);
  });
});

describe("stripEpicDispatchKey", () => {
  it(`should remove the ${USE_EPIC_DISPATCH_KEY} property`, () => {
    const action = { type: "test-action", [USE_EPIC_DISPATCH_KEY]: true } as const;
    const result = stripEpicDispatchKey(action);
    expect(result).toEqual({ type: action.type });
  });
});
