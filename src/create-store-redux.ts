import { createStore } from "./create-store";
import { State, SetState, GetState, Reducer, Action } from "./types";

export const createStoreRedux = (reducer: Reducer, initialState: State) =>
  createStore(
    (setState: SetState, getState: GetState, { subscribe }) => ({
      dispatch: (action: Action) => setState(reducer(getState(), action)),
      connect: (mapStateToProps, mapDispatchToProps) =>
        subscribe(
          mapStateToProps,
          (state) => (component: any) => (props) =>
            React.createElement(component, {
              ...props,
              ...state,
              ...mapDispatchToProps(),
            })
        ),
    }),
    initialState
  );
