import React, { useEffect } from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { recreateCounterStore } from "./fixtures";

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
      <button type="button" onClick={counterStore.increment}>
        +
      </button>
    </div>
  );
};

describe("Redux api test", () => {

});
