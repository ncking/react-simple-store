import { State } from '../../src/index.d'
export * from '../../src/index.d'

export type Reducer = (state: State, action: Action | ActionSimple) => State;


export interface ActionSimple {
    type: any;
}
export interface Action extends ActionSimple {
    [x: string]: any;
}


export declare const createStoreRedux: (reducer: Reducer, initialState: State) => Record<string, Function>;