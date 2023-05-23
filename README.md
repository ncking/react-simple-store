## Introduction

This is our take on a react store, lightweight, & with little boilerplate.
We have been using this in production for since 2020, mostly on React, SEO driven websites where performance is key.


## Motivation

- Small bundle size ~0.5K zipped
- Familliar api: similar to React-Redux, Zustand, Easy Peasy ...
- State & sate partials must be objects
- No unessary features / barebones 
- Extensable; if you need additional methods, just add to the store instance
- Seperation of state & actions / reducers ... not combined into one object, makes it simple to mutate: slice or reset
- UseStore; selector instance is not recreated on each render. If your selector maintains state, use the `rebind` argument  to force a new instance.




## Installing

using a package manager:

```bash
$ npm i @raiz/react-simple-store
```
```js
import { createStore } from '@raiz/react-simple-store'
or
import { createStoreRedux } from '@raiz/react-simple-store/redux'
```


## Instance creation 

| Method                                | Description       | Arguments |
| ---------                             | --------------    | ---- |
| createStore(actions, initialState , options)  | Creates a store              | `actions`: user defined actions function, returns the stores methods.<br>`initialState`: initial state object |
| createStoreRedux(reducer, initialState)      | Creates a store with Redux style api: ie `dispatch` method. | `reducer`: reducer function, à la Redux. <br>`initialState`: initial state object       |


## Instance methods

| Method          | Description | Arguments |
| ---------       | --------------  | ---- |
| useStore()      |             |  |
| getState()      |             |  |
| setState()      |             |  |
| destroy()       | removes all store listners            |  |
| subscribe()     | adds a store listner, which calls |  |