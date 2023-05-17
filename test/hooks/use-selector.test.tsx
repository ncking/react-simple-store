import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { recreateCounterStore } from "../fixtures";

/**
 * Tests relavent to React* Hooks, not the stanadrd functionality
 *
 * 1. test actions
 * 2. test store changes
 * 3. test rebinding selector
 */
let counterStore;
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
  it("counterStore increment test", () => {
    counterStore = recreateCounterStore();
    const { getByTestId, getByText } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    fireEvent.click(getByText("+"));
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("counterStore sideeffect test", async () => {
    counterStore = recreateCounterStore();
    const { getByTestId, getByText } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    act(() => {
      /* fire events that update state */
      counterStore.increment();
    });
   
    expect(getByTestId("count").textContent).toEqual("1");
  });
});
