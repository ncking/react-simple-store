import { createStore } from "./create-store";
import { State, SetState, GetState, Reducer, Action } from "./types";

export const createStoreRedux = (reducer: Reducer, initialState: State) =>
  createStore(
    (setState: SetState, getState: GetState) => ({
      dispatch: (action: Action) => setState(reducer(getState(), action)),
    }),
    initialState
  );
