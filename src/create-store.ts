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
  UseStoreApi,
  CreateSelectorListnerApi,
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
      listeners.delete(listener); //@NK TS: React.Destructor must return void, so cant use implicit return, as :delete returns boolean
    };
  };

  const createSelectorListner: CreateSelectorListnerApi = (
    selector,
    callback,
    equalityFn,
    initialReactHookValue = selector(state)
  ) => {
    let prevSelection = initialReactHookValue;
    return () => {
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
    addListener(
      args[1]
        ? createSelectorListner(
            ...(args as [Selector, SelectorCallback, EqualityFn])
          )
        : args[0]
    );
  //
  const useStore: UseStoreApi = (selector, equalityFn, rebind = false) => {
    const [{ v, r }, setValue] = useState({ v: selector(state), r: !!rebind }); // use obj when setting state, otherwise it may match on ref
    /**
     * Now we have useSyncExternalStoreWithSelector avalible, which
     * performs a similar funtion: setSate on store change, with equality fn
     *
     * Between the call to useState() & creating listners in useEffect, the state could of changed...
     * So we either replace useEffect, with the sync useLayoutEffect (like react-redux),
     * or create the listner() with our current state value & then check for an update ...
     * We could also check with a state  id: Symbol()
     *
     * @TODO The assumption is useEffect destruct & reinit is sync ... we need to check this
     */
    useEffect(
      () => {
        const listner = createSelectorListner(
          selector,
          (v: any) => setValue({ v, r }),
          equalityFn,
          v
        );
        listner(); /// run check that our value hasnt changed between the UseStoreApi() call & useEffect call
        return addListener(listner);
      },
      r ? [selector] : []
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
