import { useEffect, useState } from "react";
import {
  ListenerCallback,
  State,
  EqualityFn,
  Options,
  SetState,
  Selector,
  SelectorCallback,
} from "./types";

export const createStore = (
  actions: Function,
  initialState: State = {},
  options: Options = {}
) => {
  let isDispatching = false;
  let state: State = { ...initialState }; // clone to stop any external mutations
  const listeners: Set<ListenerCallback> = new Set();
  const { allowNested = true } = options;

  const setState: SetState = (partial, replace) => {
    if (!allowNested && isDispatching) {
      throw new Error("Nested state mutation disabled");
    }
    try {
      isDispatching = true;
      const nextState =
        typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state =
          replace ?? typeof nextState !== "object"
            ? nextState
            : { ...state, ...nextState };
        listeners.forEach((listener) => listener(state, previousState));
      }
    } finally {
      isDispatching = false;
    }
  };

  const getState = () => state;
  const destroy = () => listeners.clear();
  const addListener = (listener: ListenerCallback) => {
    listeners.add(listener);
    return (): void => {
      listeners.delete(listener);
    }; //@NK TS: React.Destructor must return void, so cant use implicit return, as :delete returns boolean
  };

  const subscribeWithSelector = (
    selector: Selector,
    callback: SelectorCallback,
    equalityFn?: EqualityFn
  ) => {
    let prevSelection = selector(state);
    return addListener(() => {
      const nextSelection = selector(state);
      if (
        Object.is(prevSelection, nextSelection) || // selections not changed, simple comparison
        (equalityFn && equalityFn(prevSelection, nextSelection)) // selections not equal via custom equality fn
      ) {
        return;
      }
      prevSelection = nextSelection;
      callback(nextSelection, prevSelection);
    });
  };
  //
  const subscribe = (
    selector: Selector,
    callback?: SelectorCallback,
    equalityFn?: EqualityFn
  ) =>
    callback
      ? subscribeWithSelector(selector, callback, equalityFn)
      : addListener(selector as ListenerCallback);
  //
  const useStore = (selector: Selector, equalityFn?: EqualityFn) => {
    const [value, setValue] = useState(selector(state));
    useEffect(() => subscribeWithSelector(selector, setValue, equalityFn), []);
    return value;
  };

  //

  return {
    ...actions(setState, getState, { subscribe }),
    useStore,
    getState,
    setState,
    destroy,
    subscribe,
  };
};
