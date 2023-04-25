import { USE_EPIC_DISPATCH_KEY, epicDispatch, isDispatched } from "./EpicDispatch";

describe("epicDispatch", () => {
  it(`should wrap the action alongside the ${USE_EPIC_DISPATCH_KEY.description} indicator`, () => {
    const action = { type: "test-type", payload: { a: 1, b: "b" } };
    const result = epicDispatch(action);
    expect(Object.getOwnPropertySymbols(result)).toContain(USE_EPIC_DISPATCH_KEY);
    expect(result).toEqual({ action, [USE_EPIC_DISPATCH_KEY]: true });
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
