import React from "react";

function Counter({ render }) {
  const [count, setCount] = React.useState(0);
  const increment = () => {
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  return render(count, increment, decrement);
}

const App = () => {
  return (
    <div>
      <p>Title Some title</p>
      <Counter
        render={(count, increment, decrement) => {
          return (
            <div>
              <p>Counter I am</p>
              <p>Value is {count}</p>
              <button onClick={increment}>Increment</button>
              <button onClick={decrement}>Decrement</button>
            </div>
          );
        }}
      />
    </div>
  );
};

export { App };
