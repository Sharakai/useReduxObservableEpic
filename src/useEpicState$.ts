import { useMemo } from "react";
import { Epic } from "redux-observable";
import { Observable, Subject, tap, map, partition, merge, ignoreElements } from "rxjs";

import type { ComponentEpic, UseEpicConfig } from "./ComponentEpic";
import { epicDispatch, isDispatched, stripEpicDispatchKey } from "./internal/EpicDispatch";
import { type UseEpicOptions, useEpic } from "./useEpic";

/**
 * A variant of {@link useEpic} which allows for an Epic to also emit values,
 * and returns an Observable reflecting the emitted values.
 *
 * @remarks
 * This is best used when you want to have a stream of values to access in your component,
 * but do not want to cause a re-render on every value change.
 *
 * It is useful for interop with other React libraries using async callbacks when you want to
 *   access data streams from redux or redux-observable and cannot re-create the async callback (as
 *   would happen on a re-render)
 *
 * @param epic - {@link ComponentEpic} to subscribe to and pull values from
 * @returns An {@link Observable} emitting the epic's value
 *
 * @see {@link useEpic}
 */
export function useEpicState$<V, Config extends UseEpicConfig = UseEpicConfig>(
  epic: ComponentEpic<V, Config>,
  options?: UseEpicOptions
): Observable<V> {
  const { result$, wrappedEpic } = useMemo(() => {
    const result$ = new Subject<V>();

    const wrappedEpic: Epic<Config["A"], Config["A"], Config["S"], Config["D"]> = (action$, state$, dependencies) => {
      const [dispatched$, value$] = partition(
        epic(action$, state$, { ...dependencies, dispatch: epicDispatch }),
        isDispatched
      );
      return merge(value$.pipe(tap(result$), ignoreElements()), dispatched$.pipe(map(stripEpicDispatchKey)));
    };

    return { result$: result$.asObservable(), wrappedEpic } as const;
  }, [epic]);

  useEpic(wrappedEpic, options);

  return result$;
}
