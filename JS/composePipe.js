const compose =
  (...fns) =>
  (ip) => {
    return fns.reduceRight((acc, fn) => fn(acc), ip);
  };

const pipe =
  (...fns) =>
  (ip) => {
    return fns.reduce((acc, fn) => fn(acc), ip);
  };

function fn1(a) {
  return 2 * a;
}
function fn2(a) {
  return 3 * a;
}
function fn3(a) {
  return 5 * a;
}

const composeFn = compose(fn1, fn2, fn3);

const res = composeFn(5);

console.log(res);
