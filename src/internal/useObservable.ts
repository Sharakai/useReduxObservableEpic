import { useState, useEffect } from "react";
import type { Observable } from "rxjs";

/** @internal */
export function useObservable<V>(observable$: Observable<V>, initialValue: V): V {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = observable$.subscribe({ next: setValue });
    return () => subscription.unsubscribe();
  }, [observable$]);

  return value;
}
