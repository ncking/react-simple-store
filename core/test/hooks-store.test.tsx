import React, { useEffect, useLayoutEffect } from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { recreateCounterStore } from "./fixtures/counter-store";

/**
 * Tests for React Hooks
 */
let counterStore;
beforeEach(() => {
  counterStore = recreateCounterStore();
});

const ComponentUnderTest = (props) => {
  const { selector = (s) => s.count, options } = props;
  const count = counterStore.useStore(selector, null, options);

  return (
    <div>
      <div data-testid="count">{count}</div>
      <button type="button" onClick={counterStore.increase}>
        +
      </button>
    </div>
  );
};

describe("React hooks", () => {
  it("counterStore increase", () => {
    const { getByTestId, getByText } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    fireEvent.click(getByText("+"));
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("counterStore side-effect", async () => {
    const { getByTestId } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    act(() => counterStore.increase());
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("counterStore side-effect settle first", async () => {
    const { getByTestId } = render(<ComponentUnderTest />);
    act(() => {
      counterStore.increase();
      counterStore.increase();
      counterStore.increase();
      counterStore.increase();
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
      counterStore.increase();
    });
    expect(getByTestId("count").textContent).toEqual("0");
  });

  it("should not rebind on selector change", async () => {
    const { rerender, getByTestId } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    rerender(<ComponentUnderTest selector={(s) => 0} />);
    act(() => {
      counterStore.increase();
    });
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("useLayoutEffect change", async () => {
    const ComponentUnderTest = () => {
      const count = counterStore.useStore((s) => s.count);

      useLayoutEffect(() => {
        counterStore.increase();
        counterStore.increase();
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
