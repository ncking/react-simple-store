import { createElement, ComponentType} from "react";
import { createStore } from "./create-store";
import { shallowEqual } from "./shallow-equal";
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
    return <TProps,>(WrappedComponent: ComponentType<TProps>) => {
      const wrapedWithConnect = (props: TProps) => {
        const state = useStore(mapStateToProps, shallowEqual);
        return createElement(WrappedComponent as ComponentType<{}>, {
          ...props,
          ...state,
          ...mapDispatchToProps(dispatch),
        });
      };

      const wrappedComponentName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";
      wrapedWithConnect.displayName = `Connect(${wrappedComponentName})`;
      return wrapedWithConnect;
    };
  };

  return store;
};
