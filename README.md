![useEpic logo](./logo/use-redux-observable-epic-small.png)
# useReduxObservableEpic

React hooks to integrate [Redux-Observable] Epics into a [React] component's lifecycle.

Provides access to the Redux-Observable actions observable, state observable, and dependencies, within the context of a React component.


## Purpose


## Getting Started
```sh
npm install use-redux-observable-epics
```

## API

Hook          | What it does
-------------:|:-------
[`useEpicEffect`](#useepiceffect-source) | Subscribes to the provided Epic for the lifetime of a React component.
[`useEpic$`](#useepic-source)      | A variant of `useEpicEffect` which provides the emitted values as an Observable.
[`useEpic`](#useepic-source-1)       | A variant of `useEpic$` which subscribes to the returned Observable and uses the output as React state.


### `useEpicEffect` ([_Source_][useEpicEffect])

TODO

### `useEpic$` ([_Source_][useEpic$])

TODO

### `useEpic` ([_Source_][useEpic])

TODO

## Examples

[redux-observable]: https://github.com/redux-observable/redux-observable
[react]: https://react.dev/
[redux]: https://redux.js.org/
[useEpicEffect]: src/useEpicEffect.ts
[useEpic$]: src/useEpic$.ts
[useEpic]: src/useEpic.ts
