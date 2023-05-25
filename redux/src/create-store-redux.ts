import { createElement, ComponentType } from "react";
import { createStore } from "@raiz/react-simple-store";
import { shallowEqual } from "@raiz/react-simple-store/utils";
import { State, SetState, GetState, Reducer, Action, Selector } from "./index.d";

const defaultMergeProps = (stateProps, dispatchProps, ownProps) => ({ ...ownProps, ...stateProps, ...dispatchProps }) // Coorect merge order

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
  store.connect = (mapStateToProps: Selector, mapDispatchToProps?: Function | Record<string, any>, mergeProps: Function = defaultMergeProps, options?: object) => {
    return <TProps>(WrappedComponent: ComponentType<TProps>) => {

      const wrapedWithConnect = (ownProps: TProps) => {
        const dispatchProps: object = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(dispatch, ownProps) : mapDispatchToProps
        const stateProps = useStore(mapStateToProps, shallowEqual);
        return createElement(WrappedComponent as ComponentType<{}>, mergeProps(stateProps, dispatchProps, ownProps));
      };

      const wrappedComponentName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";
      wrapedWithConnect.displayName = `Connect(${wrappedComponentName})`;
      return wrapedWithConnect;
    };
  };

  return store;
};

