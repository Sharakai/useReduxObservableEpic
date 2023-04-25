import { useMemo } from "react";
import { Epic } from "redux-observable";
import { ignoreElements, map, merge, NextObserver, partition, tap } from "rxjs";

import type { ComponentEpic, UseEpicConfig } from "../ComponentEpic";
import { useEpic, type UseEpicOptions } from "../useEpic";
import { epicDispatch, isDispatched } from "./EpicDispatch";

/** @internal */
export function useEpicStateInner<
  V,
  Config extends UseEpicConfig = UseEpicConfig,
  Observer extends NextObserver<V> = NextObserver<V>
>(epic: ComponentEpic<V, Config>, observer: Observer | (() => Observer), options?: UseEpicOptions): Observer {
  const { _observer, wrappedEpic } = useMemo(() => {
    const _observer = typeof observer === "function" ? observer() : observer;

    const wrappedEpic: Epic<Config["A"], Config["A"], Config["S"], Config["D"]> = (action$, state$, dependencies) => {
      const [dispatched$, value$] = partition(
        epic(action$, state$, { ...dependencies, dispatch: epicDispatch }),
        isDispatched
      );
      return merge(
        value$.pipe(tap(_observer), ignoreElements()),
        dispatched$.pipe(map((dispatched) => dispatched.action))
      );
    };

    return { _observer, wrappedEpic } as const;
  }, [epic, observer]);

  useEpic(wrappedEpic, options);

  return _observer;
}
