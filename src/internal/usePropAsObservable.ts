import { useEffect, useMemo } from "react";
import { Observable, Subject } from "rxjs";

/** @internal */
export function usePropAsObservable<V>(value: V): Observable<V> {
  const observable$ = useMemo(() => new Subject<V>(), []);
  useEffect(() => void observable$.next(value), [observable$, value]);
  useEffect(() => () => observable$.complete(), [observable$]);
  return observable$;
}
