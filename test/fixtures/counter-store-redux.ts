import { createStoreRedux } from "../../src";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
export const types = {INCREASE, DECREASE}

const initialState = {
  count: 0,
};

const reducers = (state, action) => {
  switch (action.type) {
    case INCREASE:
      return { ...state, counter: ++state.counter };
    case DECREASE:
      return { ...state, counter: --state.counter };
    default:
      return state;
  }
};

export const recreateCounterStoreRedux = () =>
  createStoreRedux(reducers, initialState);
