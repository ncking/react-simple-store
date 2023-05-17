import { useEffect, useState } from "react";
import {
  ActionsCreator,
  ListenerCallback,
  State,
  EqualityFn,
  Options,
  SetState,
  Selector,
  SelectorCallback,
  SubscribeApi,
  SubscribeUnbind,
} from "./types";

export const createStore = (
  actions: ActionsCreator,
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
  const addListener = (listener: ListenerCallback): SubscribeUnbind => {
    listeners.add(listener);
    return (): void => {
      listeners.delete(listener);
    }; //@NK TS: React.Destructor must return void, so cant use implicit return, as :delete returns boolean
  };

  const subscribeWithSelector = (
    selector: Selector,
    callback: SelectorCallback,
    equalityFn?: EqualityFn
  ): SubscribeUnbind => {
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
  const subscribe: SubscribeApi = (...args) =>
    args[1]
      ? subscribeWithSelector(
          ...(args as [Selector, SelectorCallback, EqualityFn])
        )
      : addListener(args[0] as ListenerCallback);
  //
  const useStore = (selector: Selector, equalityFn?: EqualityFn) => {// @TODO add options { rebind} ... do we need this? any 
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
