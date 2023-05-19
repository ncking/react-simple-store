import { State, SetState, Reducer } from "./types";
export declare const createStoreRedux: (reducer: Reducer, initialState: State) => {
    useStore: (selector: import("./types").Selector, equalityFn?: import("./types").EqualityFn | undefined, options?: {
        rebind: false;
    } | undefined) => any;
    getState: () => State;
    setState: SetState;
    destroy: () => void;
    subscribe: import("./types").SubscribeApi;
};
