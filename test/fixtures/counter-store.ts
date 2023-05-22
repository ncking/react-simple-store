import { createStore } from "../../src";
const initialState = {
  count: 0,
};

const actions = (set, get) => {
  return {
    increase: () => set({ count: ++get().count }),
    decrease: () => set({ count: --get().count }),
  };
};

export const recreateCounterStore = () => createStore(actions, initialState);
