import { createStoreRedux } from "../../src/create-store-redux";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const TIMESTAMP = "TIMESTAMP";
export const types = { INCREASE, DECREASE, TIMESTAMP };

const initialState = {
  count: 0,
};

const reducers = (state, action) => {
  switch (action.type) {
    case INCREASE:
      return { ...state, count: ++state.count };
    case DECREASE:
      return { ...state, count: --state.count };
    case TIMESTAMP:
      return { ...state, timestamp: Date.now() };
    default:
      return state;
  }
};

export const recreateCounterStoreRedux = () =>
  createStoreRedux(reducers, initialState);

export const increaseAction = () => ({ type: types.INCREASE });
export const timestampAction = () => ({ type: types.TIMESTAMP });
