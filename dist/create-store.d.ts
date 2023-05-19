import { ActionsCreator, State, EqualityFn, Options, SetState, Selector, SubscribeApi } from "./types";
export declare const createStore: (actions: ActionsCreator, initialState?: State, options?: Options) => {
    useStore: (selector: Selector, equalityFn?: EqualityFn, options?: {
        rebind: false;
    }) => any;
    getState: () => State;
    setState: SetState;
    destroy: () => void;
    subscribe: SubscribeApi;
};
