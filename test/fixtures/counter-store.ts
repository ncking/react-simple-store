import { createStore } from "../../src";

export const recreateCounterStore = () => {
  const state = {
    count: 0,
  };

  const actions = (set, get) => {
    return {
      increment: () => set({ count: get().count + 1 }),
    };
  };

  return createStore(actions, state);
};
