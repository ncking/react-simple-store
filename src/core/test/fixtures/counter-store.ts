import { createStore } from "../../src";
export { createStore } from "../../src";

export const state = {
  count: 0,
};

export const actions = (set, get) => {
  return {
    increase: () => set({ count: ++get().count }),
    decrease: () => set({ count: --get().count }),
  };
};
const args = { actions, state };
export const recreateCounterStore = () => createStore(args);
