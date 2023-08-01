const target = {
  name: "Ish",
  age: 30,
};

const person = new Proxy(target, {
  get(target, property) {
    return `I am ${target[property]}`;
  },
  set(target, property, newValue) {
    target[property] = `${target[property]}, ${newValue}`;
  },
});
