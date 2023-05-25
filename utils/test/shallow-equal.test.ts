import { shallowEqual as s } from "../src"

const testArgs: [any, any, boolean][] = [];
function shallowEqual(a1, a2) {
  const result = s(a1, a2);
  testArgs.push([a1, a2, result]);
  return result;
}

describe("shallow equals", () => {
  it('compare empty "empty" values, should be false', () => {
    expect(shallowEqual(null, false)).toBe(false);
    expect(shallowEqual(null, undefined)).toBe(false);
    expect(shallowEqual(null, 0)).toBe(false);
    expect(shallowEqual(null, -0)).toBe(false);
    expect(shallowEqual(0, false)).toBe(false);
    expect(shallowEqual(0, undefined)).toBe(false);
    expect(shallowEqual(0, -0)).toBe(false);
    expect(shallowEqual(false, undefined)).toBe(false);
    expect(shallowEqual(false, -0)).toBe(false);
    expect(shallowEqual(NaN, NaN)).toBe(true);
  });

  it("compare empty compounds with false, should be false", () => {
    expect(shallowEqual({}, false)).toBe(false);
    expect(shallowEqual([], false)).toBe(false);
  });

  it("should match objects, with keys in differnt order", () => {
    const b = {};
    expect(shallowEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(shallowEqual({ a: 1, b }, { b, a: 1 })).toBe(true);
  });

  it("should return false if differnt number of keys", () => {
    expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toBe(false);
  });

  it("should return false if arguments have different keys", () => {
    expect(
      shallowEqual({ a: 1, b: 2, c: undefined }, { a: 1, bb: 2, c: undefined })
    ).toBe(false);
    expect(shallowEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
  });

  it("should return the same result for all tests, with args swapped", () => {
    testArgs.map(([a1, a2, result]) => expect(s(a2, a1)).toBe(result));
  });
});
