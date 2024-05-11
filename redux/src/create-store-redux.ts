import { createStore } from "@raiz/react-simple-store";
import type { Reducer, Action } from "./types";
import { State, SetState, GetState } from  '../../core/src/types';
export const createStoreRedux = (reducer: Reducer, state: State) => createStore({ actions: (setState: SetState, getState: GetState) => ({ dispatch: (action: Action) => setState(reducer(getState(), action)) }), state });
