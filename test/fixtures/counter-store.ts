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

export const recreateTodosStore = () => {
  const modified = Date.now();
  const todos = [
    { id: 1, modified },
    { id: 2, modified },
    { id: 3, modified },
  ];
  const state = {
    todos,
  };

  const actions = (set, get) => {
    return {
      updateTodo: () => {
        todos[0].modified = Date.now();
        set({ todos: [...todos] });
      },
    };
  };

  return createStore(actions, state);
};
