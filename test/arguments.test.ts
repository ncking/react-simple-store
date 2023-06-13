import { createStore, actions } from "./fixtures/counter-store";

describe("arguments object defaults", () => {
  it("should work with no arguments object", () => {
    const { setState, getState } = createStore();
    setState({ count: 0 });
    setState({ count: ++getState().count });
    expect(getState().count).toEqual(1);
  });

  it("should work with empty arguments object", () => {
    const { setState, getState } = createStore({});
    setState({ count: 0 });
    setState({ count: ++getState().count });
    expect(getState().count).toEqual(1);
  });

  it("should work with just state property", () => {
    const state = { count: 5 };
    const { setState, getState } = createStore({ state });
    setState({ count: ++getState().count });
    expect(getState().count).toEqual(6);
  });

  it("should work with just actions property", () => {
    const { setState, getState, increase } = createStore({ actions });
    setState({ count: 0 });
    increase();
    expect(getState().count).toEqual(1);
  });
});
