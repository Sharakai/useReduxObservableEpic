import { combineEpics, Epic } from "redux-observable";
import { BehaviorSubject, finalize, mergeMap, Subject, takeUntil } from "rxjs";

/** @returns teardown */
export type AddEpic = (epic: Epic) => () => void;

/**
 * Creates a root Redux-Observable epic supporting dynamic addition of epics
 *
 * @param epics - Array of {@link Epic}
 */
export const createRootEpic = (epics: Epic[]) => {
  const epic$ = new BehaviorSubject(combineEpics(...epics));

  const rootEpic: Epic = (...args) => epic$.pipe(mergeMap((epic) => epic(...args)));

  const addEpic: AddEpic = (epic) => {
    const completed$ = new Subject<void>();
    const complete = () => {
      completed$.next();
      completed$.complete();
    };
    epic$.next((...epicArgs) => epic(...epicArgs).pipe(finalize(complete), takeUntil(completed$)));
    return complete;
  };

  return { rootEpic, addEpic } as const;
};
