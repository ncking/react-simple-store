import { createElement, ComponentType } from "react";
import { shallowEqual } from "@raiz/react-simple-store/utils";
import type {  Reducer } from "./types";
import type { State , Selector} from '../../core/src/types'
import { createStoreRedux } from './create-store-redux'

const defaultMergeProps = (stateProps : {}, dispatchProps: {}, ownProps: {}) => ({ ...ownProps, ...stateProps, ...dispatchProps }) // correct merge order

export const createStoreReduxConnect = (reducer: Reducer, initialState: State) => {
  //
  const store = createStoreRedux(reducer, initialState);
  const { useStore, dispatch } = store;
  //
  store.connect = (mapStateToProps: Selector, mapDispatchToProps?: Function | Record<string, any>, mergeProps: Function = defaultMergeProps, options?: object) => {
    return <TProps>(WrappedComponent: ComponentType<TProps>) => {

      const wrapedWithConnect = (ownProps: TProps) => {
        const dispatchProps: object = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(dispatch, ownProps) : mapDispatchToProps
        const stateProps: {} = useStore(mapStateToProps, shallowEqual);
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

