import { createStore } from "../../src";
const initialState = {
  count: 0,
};

const actions = (set, get) => {
  return {
    increment: () => set({ count: ++get().count }),
    decement: () => set({ count: --get().count }),
  };
};

export const recreateCounterStore = () => createStore(actions, initialState);
