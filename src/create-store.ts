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
        if (typeof nextState !== "object") {
          throw new Error("next state not object");
        }
        const previousState = state;
        state = replace ? nextState : { ...state, ...nextState };
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
      /**
       * If we have an equality fn, this takes priority otherwise it could match on ref
       */
      if (
        equalityFn
          ? equalityFn(prevSelection, nextSelection)
          : Object.is(prevSelection, nextSelection)
      ) {
        return;
      }
      callback(nextSelection, prevSelection);
      prevSelection = nextSelection;
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
  const useStore = (
    selector: Selector,
    equalityFn?: EqualityFn,
    options?: { rebind: false }
  ) => {
    // @TODO add rebind ... do we need this? any
    const [value, setValue] = useState(selector(state));
    useEffect(
      () => subscribeWithSelector(selector, setValue, equalityFn),
      [options?.rebind && selector]
    );
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
