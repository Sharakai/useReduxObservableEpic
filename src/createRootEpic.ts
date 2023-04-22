import { combineEpics, Epic } from "redux-observable";
import { BehaviorSubject, mergeMap } from "rxjs";
import type { AddEpic } from "./AddEpicContext";

/**
 * Creates a root Redux-Observable epic supporting dynamic addition of epics
 *
 * @param epics - Array of {@link Epic}
 */
export const createRootEpic = (epics: Epic[]) => {
  const epic$ = new BehaviorSubject(combineEpics(...epics));

  const rootEpic: Epic = (...args) =>
    epic$.pipe(mergeMap((epic) => epic(...args)));

  const addEpic: AddEpic = (epic: Epic) => epic$.next(epic);

  return { rootEpic, addEpic } as const;
};
