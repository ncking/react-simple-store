import type { State } from '@raiz/react-simple-store'


export type Reducer = (state: State, action: Action | ActionSimple) => State;


export interface ActionSimple {
    type: any;
}
export interface Action extends ActionSimple {
    [x: string]: any;
}


