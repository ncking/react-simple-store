import type { Reducer } from "./types";
import type { State } from '../../src/types';
export declare const createStoreReduxConnect: (reducer: Reducer, initialState: State) => Record<string, Function>;
