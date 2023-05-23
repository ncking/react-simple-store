import React, { useEffect, useLayoutEffect } from "react";
import { render, fireEvent, act } from "@testing-library/react";
import {
  recreateCounterStoreRedux,
  increaseAction,
  timestampAction
} from "./fixtures/counter-store-redux";

/**
 * Tests for Redux Connect
 */
let ComponentUnderTest;
let counterStore
beforeEach(() => {
  counterStore = recreateCounterStoreRedux();
  //
  let renderCount = 0
  const Component = ({ count, onClick, onClickTimestamp }) => {
    return (
      <div>
        <div data-testid="count">{count}</div>
        <button type="button" onClick={onClick}>
          +
        </button>
        <div data-testid="renderCount" onClick={onClickTimestamp}>{renderCount++}</div>
      </div>
    );
  };

  const mapStateToProps = (state) => ({ count: state.count });

  const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(increaseAction()),
    onClickTimestamp: () => dispatch(timestampAction()),
  });

  ComponentUnderTest = counterStore.connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
});

describe("React +  Redux dispatch", () => {

  it("counterStore increase", () => {
    const { getByTestId, getByText } = render(<ComponentUnderTest />);
    expect(getByTestId("count").textContent).toEqual("0");
    fireEvent.click(getByText("+"));
    expect(getByTestId("count").textContent).toEqual("1");
  });

  it("should not rerender on other slice change", () => {
    const { getByTestId, getByText } = render(<ComponentUnderTest />);
    const el = getByTestId("renderCount")
    expect(el.textContent).toEqual("0");
    fireEvent.click(el);
    expect(el.textContent).toEqual("0");
    fireEvent.click(getByText("+"));
    expect(el.textContent).toEqual("1");
  });


});
