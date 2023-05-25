export type State = {
  [x: string]: any;
};
export type ListenerCallback = (state: State, prevState: State) => void;
export type EqualityFn = (
  oldSelectorValue: any,
  newSelectorValue: any
) => boolean;
export type SetState = (partial: Partial<State>, replace?: boolean) => void;
export type GetState = () => State;
export type Selector = (state: State) => any;
export type SelectorCallback = (nextState?: State, prevState?: State) => void;

export type SubscribeUnbind = () => void;
export type SubscribeApi = (
  selector: Selector,
  callback?: SelectorCallback,
  equalityFn?: EqualityFn
) => SubscribeUnbind;

export type Options = {
  allowNested?: boolean;
};

export type UseStoreApi = (
  selector: Selector,
  equalityFn?: EqualityFn,
  rebind?: boolean
) => void;

export type CreateSelectorListnerApi = (
  selector: Selector,
  callback: SelectorCallback,
  equalityFn?: EqualityFn,
  initialReactHookValue?: any
) => () => void;

export type ActionsCreator = (
  setState: SetState,
  getState: GetState,
  { subscribe }: { subscribe: SubscribeApi }
) => State;

export declare const createStore: (
  actions: ActionsCreator,
  initialState?: State,
  options?: Options
) => Record<string, Function>;
