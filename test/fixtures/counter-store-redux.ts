import { createStoreRedux } from "../../src";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

const initialState = {
  count: 0,
};

const reducers = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: ++state.counter };
    case DECREMENT:
      return { ...state, counter: --state.counter };
    default:
      return state;
  }
};

export const recreateCounterStoreRedux = () =>
  createStoreRedux(reducers, initialState);
