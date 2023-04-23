import { useEffect } from "react";
import { EMPTY, endWith, filter, map, switchMap } from "rxjs";

import { useAddEpic } from "./AddEpicContext";
import type { ComponentEpic } from "./ComponentEpic";
import type { UseEpicConfig } from "./UseEpicConfig";
import { usePropAsObservable } from "./internal/usePropAsObservable";
import { epicDispatch, isDispatched, stripEpicDispatchKey } from "./internal/EpicDispatch";

/**
 * Subscribes to the provided Epic for the lifetime of a React component.
 *
 * @remarks
 *
 * Provides the ability to run side-effects within the context of a React component
 * with access to the `redux-observable` action and state streams and dependencies.
 *
 * The provided `epic` is subscribed in the components effect phase, and unsubscribed
 * on component teardown. The epic is subsequently removed from the `redux-observable`
 * pipeline and will receive no further action or state emissions.
 *
 * @example
 * An epic to time the duration between a "start-timing" and "stop-timing" action being
 * dispatched from within a React component
 * ```tsx
 * const startTiming = createAction<string>("start-timing");
 * const stopTiming = createAction<string>("stop-timing");
 *
 * const timingEpic = (action$, state$, { logService }) =>
 *   action$.pipe(
 *     ofType(startTiming.type),
 *     switchMap(start => {
 *       const startTime = Date.now();
 *       return action$.pipe(
 *         ofType(stopTiming.type),
 *         filter(stop => start.payload === stop.payload),
 *         map(() => Date.now() - startTime),
 *       );
 *     }),
 *     take(1),
 *     withLatestFrom(state$),
 *     tap(([elapsedTime, state]) => {
 *       const userId = state.user.id;
 *       logService.upload(userId, elapsedTime);
 *     }),
 *   );
 *
 * const RootComponent: FC = () => {
 *   // Connect the `timingEpic` into redux-observable for the lifetime of the component
 *   useEpicEffect(timingEpic);
 *   return (
 *     <div>
 *       <TimedComponent componentId="1" />
 *       <TimedComponent componentId="2" />
 *     </div>
 *   );
 * };
 *
 * const TimedComponent: FC<{ componentId: string }> = ({ componentId }) => {
 *   const dispatch = useDispatch();
 *
 *   useEffect(() => {
 *     dispatch(startTiming(componentId));
 *     return () => dispatch(stopTiming(componentId));
 *   }, [dispatch]);
 *
 *   return <div>Being Timed!</div>;
 * };
 * ```
 */
export function useEpicEffect<V = unknown, Config extends UseEpicConfig = UseEpicConfig>(
  epic: ComponentEpic<V, Config>
): void {
  const epic$ = usePropAsObservable(epic);
  const addEpic = useAddEpic();

  useEffect(() => {
    addEpic((action$, state$, dependencies) => {
      const _dependencies = { ...dependencies, dispatch: epicDispatch };

      return epic$.pipe(
        endWith(() => EMPTY),
        switchMap((epic) => epic(action$, state$, _dependencies)),
        filter(isDispatched),
        map(stripEpicDispatchKey)
      );
    });
  }, [addEpic, epic$]);
}
