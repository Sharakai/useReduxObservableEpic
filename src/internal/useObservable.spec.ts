import { act, renderHook } from "@testing-library/react";
import { useObservable } from "./useObservable";
import { Subject } from "rxjs";

describe("useObservable", () => {
  it("immediately returns the initial state value", () => {
    const observable$ = new Subject<number>();
    const initialValue = 0;
    const { result } = renderHook(() => useObservable(observable$, initialValue));
    expect(result.current).toEqual(0);

    act(() => observable$.next(1));
    expect(result.current).toBe(1);
  });

  it("updates the state value on observable$ emission", () => {
    const observable$ = new Subject<number>();
    const { result } = renderHook(() => useObservable(observable$, 0));

    act(() => observable$.next(1));
    expect(result.current).toBe(1);

    act(() => observable$.next(-50));
    expect(result.current).toBe(-50);

    act(() => observable$.next(123_456));
    expect(result.current).toBe(123_456);
  });

  it("stops listening to the observable on unmount", () => {
    const observable$ = new Subject<number>();
    const { result, unmount } = renderHook(() => useObservable(observable$, 0));

    unmount();
    act(() => observable$.next(1));
    expect(result.current).toBe(0);
  });
});
