// to enable deep level flatten use recursion with reduce and concat
function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
}

const flattenArr = flatDeep([1, [2], [[3], 4], [5]], Infinity);
console.log(flattenArr); // [1, 2, 3, 4, 5]
