/**
 * Custom implementation of React-like library.
 *
 * @namespace React
 */
const React = (() => {
  let data = [];
  let index = 0;
  /**
   * Custom implementation of useState hook.
   *
   * @memberOf React
   * @function useState
   * @param {any} val - The initial value of the state.
   * @return {[any, function]} - An array containing the current state value and a function to update the state.
   */
  function useState(val) {
    let state = data[index] || val;
    const _index = index;
    let setState = (val) => {
      data[_index] = val;
    };
    index++;
    return [state, setState];
  }

  /**
   * Custom implementation of useEffect hook.
   *
   * @memberOf React
   * @function useEffect
   * @param {function} cb - The callback function to be executed when the dependencies change.
   * @param {Array} dep - An array of dependencies to track changes.
   */
  function useEffect(cb, dep) {
    const oldDeps = data[index];
    let hasChanged = true;
    if (oldDeps) {
      hasChanged = dep.some((d, i) => !Object.is(d, oldDeps[i]));
    }
    data[index] = dep;
    hasChanged && cb();
  }

  /**
   * Custom implementation of useRef hook.
   *
   * @memberOf React
   * @function useRef
   * @param {any} val - The initial value to be stored in the reference.
   * @return {Object} - The mutable ref object.
   */
  function useRef(val) {
    return useState({ current: val })[0];
  }

  /**
   * Function to render a component and simulate re-rendering.
   *
   * @memberOf React
   * @function render
   * @param {function} component - The component function to be rendered.
   * @return {Object} - The rendered component.
   */
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
 *
 * @memberOf React
 * @function Component
 * @return {Object} - An object containing the render function, click function, and check function.
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
    /**
     * Render function of the component.
     *
     * @memberOf React.Component
     * @function render
     */
    render: () => {
      console.log({ count, text });
    },
    /**
     * Click function to increment the count state.
     *
     * @memberOf React.Component
     * @function click
     */
    click: () => setCount(count + 1),
    /**
     * Check function to update the text state.
     *
     * @memberOf React.Component
     * @function check
     * @param {string} t - The new text value.
     */
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
