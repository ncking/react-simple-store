import React, { useEffect, useLayoutEffect } from "react";
import { render, fireEvent, act } from "@testing-library/react";
import {
  recreateCounterStoreRedux,
  increaseAction,
} from "./fixtures/counter-store-redux";

/**
 * Tests for React Hooks
 */
let counterStore;
let increase;
beforeEach(() => {
  counterStore = recreateCounterStoreRedux();
  increase = () => counterStore.dispatch(increaseAction());
});

const ComponentUnderTest = (props) => {
  const { selector = (s) => s.count, options } = props;
  const count = counterStore.useStore(selector, null, options);

  return (
    <div>
      <div data-testid="count">{count}</div>
      <button type="button" onClick={increase}>
        +
      </button>
    </div>
  );
};

describe("React +  Redux dispatch", () => {
  it("counterStore increase", () => {
    const { getByTestId, getByText } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    fireEvent.click(getByText("+"));
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("counterStore side-effect", async () => {
    const { getByTestId } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    act(() => increase());
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("counterStore side-effect settle first", async () => {
    const { getByTestId } = render(<ComponentUnderTest />);
    act(() => {
      increase();
      increase();
      increase();
      increase();
    });
    expect(getByTestId("count").textContent).toEqual("4");
  });

  it("should rebind on selector change", async () => {
    const { rerender, getByTestId } = render(
      <ComponentUnderTest options={{ rebind: true }} />
    );
    expect(getByTestId("count").textContent).toEqual("0");
    rerender(<ComponentUnderTest selector={(s) => 0} />);
    act(() => {
      increase();
    });
    expect(getByTestId("count").textContent).toEqual("0");
  });

  it("should not rebind on selector change", async () => {
    const { rerender, getByTestId } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    rerender(<ComponentUnderTest selector={(s) => 0} />);
    act(() => {
      increase();
    });
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("useLayoutEffect change", async () => {
    const ComponentUnderTest = () => {
      const count = counterStore.useStore((s) => s.count);

      useLayoutEffect(() => {
        increase();
        increase();
      }, []);

      return (
        <div>
          <div data-testid="count">{count}</div>
          <button type="button" onClick={counterStore.increase}>
            +
          </button>
        </div>
      );
    };
    const { rerender, getByTestId } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("2");
  });
});
