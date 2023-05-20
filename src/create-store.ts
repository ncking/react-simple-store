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
  UseStoreApi
} from "./types";

export const createStore = (
  actions: ActionsCreator,
  initialState: State = {},
  options: Options = {}
) => {
  let isDispatching = false;
  let stateId
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
      listeners.delete(listener); //@NK TS: React.Destructor must return void, so cant use implicit return, as :delete returns boolean
    };
  };

  const createSelectorListner = (
    selector: Selector,
    callback: SelectorCallback,
    equalityFn?: EqualityFn
  ): SubscribeUnbind => {
    let prevSelection = selector(state);
    let lastSeenId: any
    return () => {
      if (lastSeenId === stateId) return
      lastSeenId = stateId
      const nextSelection = selector(state);
      /**
       * If we have an equality fn, this takes priority otherwise it could match on ref
       * on nested mutations
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
    };
  };
  //
  const subscribe: SubscribeApi = (...args) =>
    addListener(args[1] ? createSelectorListner(...(args as [Selector, SelectorCallback, EqualityFn])) : args[0]);
  //
  const useStore: UseStoreApi = (selector, equalityFn, rebind) => {
    const [{ v }, setValue] = useState({ v: selector(state) });
    /**
     * So between the useState() setup & creating listners in useEffect, the state could of changed...
     * So we either replace useEffect, with the sync useLayoutEffect (like react-redux),
     * or call the listner() to check for an update
     */
    useEffect(
      () => {
        const listner = createSelectorListner(
          selector,
          (v: any) => setValue({ v }),
          equalityFn
        );
        listner();
        return addListener(listner);
      },
      rebind ? [selector] : []
    );
    return v;
  };

  //
  return {
    ...actions(setState, getState, { subscribe }),
    useStore,
    getState,
    setState,
    destroy,
    subscribe,
  } as Record<string, Function>;
};
