const obj = {
  values: [1, 2, 3, 4, 5],
  cur: 0,
  [Symbol.iterator]() {
    let values = this.values;
    let cur = this.cur;
    return {
      next() {
        if (cur < values.length) {
          return { value: values[cur++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};
