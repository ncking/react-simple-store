import { ActionsCreator, State, Options } from "./types";
export declare const createStore: (actions: ActionsCreator, initialState?: State, options?: Options) => Record<string, Function>;
