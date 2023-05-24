// copy of https://github.com/gaearon/react-pure-render/blob/master/src/shallowEqual.js

export const shallowEqual = (objA: any, objB: any) => {
  if (Object.is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  // Test for A's keys different from B.
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    const k = keysA[i];
    if (!bHasOwnProperty(k) || !Object.is(objA[k], objB[k])) {
      return false;
    }
  }

  return true;
};
