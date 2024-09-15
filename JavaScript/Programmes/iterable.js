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

//or with arrow function this can be

const obj = {
  values: [1, 2, 3, 4, 5],
  cur: 0,
  [Symbol.iterator]() {
    return {
      next: () =>  {
        if (this.cur < this.values.length) {
          return { value: this.values[this.cur++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

// usage
for(let i of obj){ console.log(i)}
