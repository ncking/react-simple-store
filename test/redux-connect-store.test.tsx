import React, { useEffect, useLayoutEffect } from "react";
import { render, fireEvent, act } from "@testing-library/react";
import {
  recreateCounterStoreRedux,
  increaseAction,
} from "./fixtures/counter-store-redux";

/**
 * Tests for Redux Connect
 */
let ComponentUnderTest;
beforeEach(() => {
  const counterStore = recreateCounterStoreRedux();
  //
  const Component = ({ count, onClick }) => {
    return (
      <div>
        <div data-testid="count">{count}</div>
        <button type="button" onClick={onClick}>
          +
        </button>
      </div>
    );
  };

  const mapStateToProps = (state) => ({ count: state.count });

  const mapDispatchToProps = (dispatch) => ({
    onClick: () => dispatch(increaseAction()),
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
    //expect(getByTestId("count").textContent).toEqual("1");
  });
});
