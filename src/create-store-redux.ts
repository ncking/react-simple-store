import { createElement } from "react";
import { createStore } from "./create-store";
import { State, SetState, GetState, Reducer, Action, Selector } from "./types";

export const createStoreRedux = (reducer: Reducer, initialState: State) => {
  const actions = (setState: SetState, getState: GetState) => {
    return {
      dispatch: (action: Action) => setState(reducer(getState(), action)),
    };
  };
  //
  const store = createStore(actions, initialState);
  const { useStore, dispatch } = store;
  //
  store.connect = (mapStateToProps: Selector, mapDispatchToProps: any) => {
    return (Component: any) => (props: any) => {
      const state = useStore(mapStateToProps);
      return createElement(Component, {
        ...props,
        ...state,
        ...mapDispatchToProps(dispatch),
      });
    };
  };

  return store;
};
