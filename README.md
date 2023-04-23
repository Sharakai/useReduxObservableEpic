![useEpic logo](./logo/useEpic-logo-small.png)
# useEpic

A set of hooks integrating Redux-Observable into a React component lifecycle.


Hook          | What it does
-------------:|:-------
[**useEpicEffect**][useEpicEffect] | Subscribes to the provided Epic for the lifetime of a React component.
[**useEpic\$**][useEpic$]      | A variant of [useEpicEffect] which provides the emitted values as an Observable.
[**useEpic**][useEpic]       | A variant of [useEpic$] which subscribes to the returned Observable and uses the output as React state.

[useEpicEffect]: src/useEpicEffect.ts
[useEpic$]: src/useEpic$.ts
[useEpic]: src/useEpic.ts
