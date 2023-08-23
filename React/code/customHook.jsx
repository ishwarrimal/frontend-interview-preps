import React from "react";

function useCounter(initialVal = 0) {
  const [count, setCount] = React.useState(initialVal);
  const increment = () => {
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
  };
  return { count, increment, decrement };
}

function Counter() {
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <p>Counter I am</p>
      <p>Value is {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export { Counter, useCounter };
