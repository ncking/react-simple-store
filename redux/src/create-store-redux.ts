import { createStore } from "@raiz/react-simple-store";
import { State, SetState, GetState, Reducer, Action } from "./index.d";
export const createStoreRedux = (reducer: Reducer, state: State) => createStore({ actions: (setState: SetState, getState: GetState) => ({ dispatch: (action: Action) => setState(reducer(getState(), action)) }), state });
