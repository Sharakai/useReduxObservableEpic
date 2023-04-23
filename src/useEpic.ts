import type { ComponentEpic } from "./ComponentEpic";
import type { UseEpicConfig } from "./UseEpicConfig";
import { useEpic$ } from "./useEpic$";
import { useObservable } from "./internal/useObservable";

/**
 * A variant of {@link useEpic$} which subscribes to the returned Observable and
 * uses the output as React state.
 *
 * @remarks
 * Causes a re-render of a component whenever the epic's status changes or a new value is emitted.
 *
 * @param epic - {@link ComponentEpic} to subscribe to and pull values from
 * @param initialValue - Initial value for the state's value
 * @returns The last emitted value
 *
 * @see {@link useEpic$}
 *
 * @example
 * Request a stream of data from a service using data in redux, render on the UI, and stop on logout
 * ```tsx
 * interface Player {
 *   id: string;
 *   name: string;
 * }
 *
 * const logout = createAction("logout");
 *
 * const playersEpic: ComponentEpic<
 *   Player[],
 *   {
 *     S: { game: { id: string } }
 *     D: { playerService: { getPlayers$: (id: string) => Observable<Player[]> } }
 *   }
 * > = (action$, state$, { playerService }) =>
 *   defer(() => {
 *     const { game } = state$.value;
 *     const players$ = playerService.getPlayers$(game.id);
 *     return players$.pipe(
 *       startWith({ value: [], loading: true, error: false, fulfilled: false }),
 *       scan<Player[]>((acc, value) => [...acc, ...value], []),
 *       map(value => ({ value, loading: false, error: false, fulfilled: false })),
 *       takeUntil(action$.pipe(ofType(logout.type))),
 *       catchError(() => of({ value: [], loading: false, error: true, fulfilled: true})),
 *       endWith({ value: [], loading: false, error: false, fulfilled: true })
 *     );
 *   });
 *
 * const MyComponent: FC = () => {
 *   const {} = useEpic(playersEpic, []);
 *
 *   if (pending) return <div>Loading...</div>;
 *
 *   if (error) return <div>Failed to fetch player data</div>;
 *
 *   return (
 *     <>
 *       <ul>
 *         {players.map(player => (
 *           <li key={player.id}>{player.name}</li>
 *         ))}
 *       </ul>
 *       {fulfilled && <div>Connection to server closed.</div>}
 *     </>
 *   );
 * };
 * ```
 */
export function useEpic<V, Config extends UseEpicConfig = UseEpicConfig>(
  epic: ComponentEpic<V, Config>,
  initialValue: V
): V {
  const value$ = useEpic$(epic);
  return useObservable(value$, initialValue);
}
