import { recreateCounterStore } from "./fixtures";

let subscribe;
let setState;
let increment;
beforeEach(() => {
  ({ subscribe, setState, increment } = recreateCounterStore());
});

describe("vanilla js", () => {
  it("should be called on store change", () => {
    const spy = jest.fn();
    subscribe(spy);
    setState({ dummy: Date.now() });
    expect(spy).toHaveBeenCalled();
  });

  it("should be called on slice change", () => {
    const spy = jest.fn();
    subscribe((s) => s.dummy, spy);
    setState({ dummy: Date.now() });
    expect(spy).toHaveBeenCalled();
  });

  it("should not be called on other slice change", () => {
    const spy = jest.fn();
    subscribe((s) => s.dummy, spy);
    setState({ dummy2: Date.now() });
    expect(spy).not.toHaveBeenCalled();
  });

  it("should not be called if equality true", () => {
    const spy = jest.fn();
    subscribe(
      (s) => s.dummy,
      spy,
      () => true
    );
    setState({ dummy: Date.now() });
    expect(spy).not.toHaveBeenCalled();
  });

  it("should be called if equality false", () => {
    const spy = jest.fn();
    setState({ dummy: { name: "my object", created: Date.now() } });
    subscribe(
      (s) => s.dummy,
      spy,
      () => false
    );
    setState({ dummy2: Date.now() });
    expect(spy).toHaveBeenCalled();
  });

  it("should unsubscribe", () => {
    const spy = jest.fn();
    const unsub = subscribe((s) => s.count, spy);
    increment();
    unsub();
    increment();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1, 0);
  });
});
