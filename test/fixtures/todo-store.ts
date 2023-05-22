import { createStore } from "../../src";

const modified = Date.now();
const todos = [
  { id: 1, modified },
  { id: 2, modified },
  { id: 3, modified },
];
const initialState = {
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

export const recreateTodosStore = () => createStore(actions, initialState);
