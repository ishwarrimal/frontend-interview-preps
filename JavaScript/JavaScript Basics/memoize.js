function memoize(expensiveFn) {
  const cache = {};
  return function (cb) {
    const key = JSON.stringify(cb);
    if (cache[key]) {
      cb(cache[key]);
    } else {
      expensiveFn((res) => {
        cache[key] = res
        cb(res);
      });
    }
  };
}

// Do not modify from below
function expensiveFn(callbackFn) {
  setTimeout(() => callbackFn("movies list"), 30);
}

const memoizedExpensiveFn = memoize(expensiveFn);

let t1 = performance.now();
memoizedExpensiveFn((result) => {
  let t2 = performance.now();
  console.log(`Response received: ${result} in ${t2 - t1}ms`);
  // Response received: movies list in 30ms
});

setTimeout(() => {
  let t1 = performance.now();
  memoizedExpensiveFn((result) => {
    let t2 = performance.now();
    console.log(`Response received: ${result} in ${t2 - t1}ms`);
    // Response received: movies list in 0ms
  });
}, 100);
