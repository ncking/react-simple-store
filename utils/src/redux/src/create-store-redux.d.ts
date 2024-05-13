import type { Reducer } from "./types";
import { State } from '../../src/types';
export declare const createStoreRedux: (reducer: Reducer, state: State) => Record<string, Function>;
