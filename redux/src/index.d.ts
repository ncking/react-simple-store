import { SetState, GetState, SubscribeApi, State } from '../../src/types'
export * from '../../src/types'


export interface ActionSimple {
    type: any;
}

export interface Action extends ActionSimple {
    [x: string]: any;
}

export type ActionsCreator = (
    setState: SetState,
    getState: GetState,
    { subscribe }: { subscribe: SubscribeApi }
) => State;


export type Reducer = (state: State, action: Action | ActionSimple) => State;