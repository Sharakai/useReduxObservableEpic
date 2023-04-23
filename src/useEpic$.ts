import { useMemo } from "react";
import { Observable, Subject, from, tap } from "rxjs";

import type { ComponentEpic } from "./ComponentEpic";
import type { UseEpicConfig } from "./UseEpicConfig";
import { isDispatched } from "./internal/EpicDispatch";
import { type UseEpicOptions, useEpicEffect } from "./useEpicEffect";

/**
 * A variant of {@link useEpicEffect} which provides the emitted values as an Observable.
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
 * @returns A {@link Subject} emitting the epic's value
 *
 * @see {@link useEpicEffect}
 */
export function useEpic$<V, Config extends UseEpicConfig = UseEpicConfig>(
  epic: ComponentEpic<V, Config>,
  options?: UseEpicOptions
): Observable<V> {
  const { result$, wrappedEpic } = useMemo(() => {
    const result$ = new Subject<V>();

    const wrappedEpic: ComponentEpic<V, Config> = (...epicArgs) =>
      from(epic(...epicArgs)).pipe(
        tap({
          next: (value) => {
            if (!isDispatched(value)) result$.next(value);
          },
          complete: () => result$.complete(),
          error: (error) => result$.error(error),
        })
      );

    return { result$: result$.asObservable(), wrappedEpic } as const;
  }, [epic]);

  useEpicEffect(wrappedEpic, options);

  return result$;
}
