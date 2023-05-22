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
      return { ...state, count: ++state.count };
    case DECREASE:
      return { ...state, count: --state.count };
    default:
      return state;
  }
};

export const recreateCounterStoreRedux = () =>
  createStoreRedux(reducers, initialState);



export const increaseAction = () => ({ type: types.INCREASE })

