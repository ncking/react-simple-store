export type State = {};
export type ListenerCallback = (state: State, prevState: State) => void;
export type EqualityFn = (
  oldSelectorValue: any,
  newSelectorValue: any
) => boolean;
export type SetState = (partial: Partial<State>, replace?: boolean) => void;
export type GetState = () => State;
export type Selector = (state: State) => any;
export type SelectorCallback = (nextState?: State, prevState?: State) => void;
export type ActionsCreator = (
  setState: SetState,
  getState: GetState,
  { subscribe }: { subscribe: SubscribeApi }
) => State;
export type Reducer = (state: State, action: Action | ActionSimple) => State;
export type SubscribeUnbind = () => void;
export type SubscribeApi = (
  selector: Selector,
  callback?: SelectorCallback,
  equalityFn?: EqualityFn
) => SubscribeUnbind;

export interface ActionSimple {
  type: any;
}
export interface Action extends ActionSimple {
  [props: string]: any;
}
export type Options = {
  allowNested?: boolean;
};


export type UseStoreApi =(
  selector: Selector,
  equalityFn?: EqualityFn,
  rebind?: boolean
) => void
