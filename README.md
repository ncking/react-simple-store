## Introduction

This is our take on a react store, tiny & easy to use.
We have been using this in production for since 2020, mostly on React/Preact, SEO driven websites where performance is key.


## Advantages 

- Small bundle size ~0.5K
- Performance - re-rendered only on required state changes
- Familiar api: similar to React-Redux, Zustand, Easy Peasy ...
- Granular module exports adding functionality:  React >> React Redux >> React Redux Connect 
- Extensible; if you need additional methods, just add to the store instance
- Separation of state & actions / reducers ... not combined into one object; simple to reset/reload state
- UseStore; selector instance is not recreated on each render. If your selector maintains state, use the `rebind` argument  to force a new instance.



##
## Installing

```bash
$ npm i @raiz/react-simple-store
#or
$ yarn add @raiz/react-simple-store
```
##
## Create a store(s)
Each store is created with the `createStore` function.
We have extended this function with 2 Redux varients: `createStoreRedux` & `createStoreReduxConnect`;
these add methos to mimic depatch & connect apis.
For all modern projects we recommend just using `createStore`.

#### Basic store
```js
// Basic store
import { createStore } from '@raiz/react-simple-store'

const initialState = {
  count: 0,
};

const actions = (set, get) => {
  return {
    increase: () => set({ count: ++get().count }),
    decrease: () => set({ count: --get().count }),
  };
};

export const counterStore =  createStore(actions, initialState);
```

##
## Add additional methods
```js
// Basic store
import { createStore } from '@raiz/react-simple-store'
import { shallowEqual } from '@raiz/react-simple-store/utils'
const initialState = {
  count: 0,
};

const actions = (set, get) => {
  return {
    increase: () => set({ count: ++get().count }),
    decrease: () => set({ count: --get().count }),
  };
};

export const counterStore =  createStore(actions, initialState);
// add a hook method with shallowEqual fn
counterStore.useStoreShallow = selector => counterStore.useStore(selector, shallowEqual)
```


##
## Export your store
We recommend creating a store in its own file & exporting.
You can export the stores methods, or the store object.
We prefer exporting the store object, this makes it clear & consistent when multiple stores may be consumed in the same file.

```js
// export store methods
// The downside is we must name all the custom actions & most likely will have to alias 
export const { useStore, getState, setState, destroy, subscribe} = createStore(actions, initialState);

// export the store instance; clear & consistent
export const counterStore = createStore(actions, initialState);
```

##
## Using your store(s)


```js
// Basic hook usage
import { counterStore } from './counterstore'

const Component = (props) => {
  const count = counterStore.useStore((s) => s.count);
  return (
    <div>
      <div data-testid="count">{count}</div>
      <button type="button" onClick={counterStore.increase}>+</button>
    </div>
  );
};
```
