import { State, Reducer } from "./types";
export declare const createStoreRedux: (reducer: Reducer, initialState: State) => Record<string, Function>;
