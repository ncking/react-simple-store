import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { recreateCounterStore } from "../fixtures";

/**
 * Tests for React Hooks
 */
let counterStore;
beforeEach(() => {
  counterStore = recreateCounterStore();
});

const ComponentUnderTest = () => {
  const count = counterStore.useStore((s) => s.count);
  return (
    <div>
      <div data-testid="count">{count}</div>
      <button type="button" onClick={counterStore.increment}>
        +
      </button>
    </div>
  );
};

describe("react", () => {
  it("counterStore increment", () => {
    const { getByTestId, getByText } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    fireEvent.click(getByText("+"));
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("counterStore side-effect", async () => {
    const { getByTestId } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    act(() => counterStore.increment());
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("counterStore side-effect settle first", async () => {
    const { getByTestId } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    act(() => {
      counterStore.increment();
      counterStore.increment();
      counterStore.increment();
      counterStore.increment();
    });
    expect(getByTestId("count").textContent).toEqual("4");
  });
});
