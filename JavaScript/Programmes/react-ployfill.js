/**
 * Custom implementation of React-like library. -> https://www.youtube.com/watch?v=RnwqU9dqTr4
 *
 * @namespace React
 */
const React = (() => {
  let data = [];
  let index = 0;

  function useState(val) {
    let state = data[index] || val;
    const _index = index;
    let setState = (val) => {
      data[_index] = val;
    };
    index++;
    return [state, setState];
  }

  function useEffect(cb, dep) {
    const oldDeps = data[index];
    let hasChanged = true;
    if (oldDeps) {
      hasChanged = dep.some((d, i) => !Object.is(d, oldDeps[i]));
    }
    data[index] = dep;
    hasChanged && cb();
  }

  function useRef(val) {
    return useState({ current: val })[0];
  }

  function render(component) {
    index = 0;
    let c = component();
    c.render();
    return c;
  }
  return { useState, useEffect, useRef, render };
})();

/**
 * Example component function.
 */
function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("Ishwar");
  const ref = React.useRef("123");
  React.useEffect(() => {
    console.log("I am use effect");
    console.log(ref.current);
  }, [count]);
  return {
    render: () => {
      console.log({ count, text });
    },
    click: () => setCount(count + 1),
    check: (t) => setText(t),
  };
}
//Here render is equivalent to re render in react
var App = React.render(Component);
App.click();
App = React.render(Component);
App.click();
App = React.render(Component);
App.check("Rimal");
App = React.render(Component);
