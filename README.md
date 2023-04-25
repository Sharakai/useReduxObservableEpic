### 🚧 WORK IN PROGRESS - Expect breaking changes. Use at your own risk. 🚧

---

![useEpic logo](./logo/use-redux-observable-epic-small.png)
# useReduxObservableEpic

React hooks to integrate [Redux-Observable] Epics into a [React] component's lifecycle.

Provides access to the Redux-Observable actions and state observables and dependencies within the context of a React component.


## Purpose


## Getting Started
```sh
npm install use-redux-observable-epic
```

## API

Hook          | What it does
-------------:|:-------
[`useEpic`](#useEpic-source) | Subscribes to the provided Epic for the lifetime of a React component.
[`useEpicState$`](#useepic-source) | A variant of `useEpic` which provides the emitted values as an Observable.
[`useEpicState`](#useepic-source-1) | A variant of `useEpicState$` which subscribes to the returned Observable and uses the output as React state.


### `useEpic` ([_Source_][useEpic])

TODO

### `useEpicState$` ([_Source_][useEpicState$])

TODO

### `useEpicState` ([_Source_][useEpic])

TODO

## Examples

[redux-observable]: https://github.com/redux-observable/redux-observable
[react]: https://react.dev/
[redux]: https://redux.js.org/
[useEpic]: src/useEpic.ts
[useEpicState$]: src/useEpicState$.ts
[useEpicState]: src/useEpicState.ts
