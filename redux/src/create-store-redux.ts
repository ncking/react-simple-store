import { createStore } from "@raiz/react-simple-store";
import { State, SetState, GetState, Reducer, Action } from "./index.d";
export const createStoreRedux = (reducer: Reducer, initialState: State) => createStore((setState: SetState, getState: GetState) => ({ dispatch: (action: Action) => setState(reducer(getState(), action)) }), initialState);
