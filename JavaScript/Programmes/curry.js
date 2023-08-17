/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  const curLength = func.length;
  let i = 0;
  const argList = [];
  return function retFunction(a) {
    i++;
    argList.push(a);
    if (i < curLength) {
      return retFunction;
    }
    console.log(...argList);
    return func(...argList);
  };
}

function multiplyThree(a, b, c) {
  return a * b * c;
}

const curriedMultiplyThree = curry(multiplyThree);

const containsFour = curriedMultiplyThree(4);
console.log(containsFour);
const containsFourMulFive = containsFour(5);
console.log(containsFourMulFive(6)); // 120


