# React

React is a JavaScript library for building user interfaces. It was developed by Facebook and released as an open-source project. React is primarily used for building single-page applications (SPAs) and mobile applications, although it can also be used for creating specific components within larger web applications.

## Why React?

React has following advantage over traditional way of building web apps.

1. **Component based architecture**
   - Modular code.
   - Reusability.
   - Self contained elements that encapsulates their own logic and UI.
   - Easeir to test and maintain.
2. **JSX**
   - Closely resembels HTML.
   - Better way to handle UI Logic.
3. **Virtual DOM**
   - Efficiently update the DOM.
   - Minimise expensive dom manipulation by first updating the virtual DOM.
4. **Unidirection data flow**
   - Data flows from parent to the children.
5. **State Management**
   - State management for larger applicaiton is very difficult in traditional applications.
   - Easier to manage the state of the applcation with React.
6. **Developer Ecosystem**
   - Numerous tutorials available.
   - Numerous libraries available.
7. **React Native**
   - Use react skills to build mobile app using React Native.

## JSX vs JS

Not a valid comparison as JSX is only limited to React ecosystem while JS is a programming language supported by all the browser and JS Runtime like Nodejs.
JSX is a syntax extension that simplifies the creation of user interfaces in React by allowing developers to write HTML-like code within their JavaScript files.
**JSX (JavaScript XML):**

1.  **Syntax:** JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files. It's used to describe the structure and layout of user interfaces in React components.
2.  **Readability:** JSX can make code more readable and intuitive, as it closely resembles the structure of the UI. This can be particularly helpful when building complex user interfaces.
3.  **Component Rendering:** JSX is used to define the UI components and their hierarchy in React. When you write JSX, it gets transpiled into JavaScript code that creates and updates the corresponding DOM elements.
4.  **Integration with React:** JSX is the recommended way to define UI elements in React. It allows you to combine JavaScript logic and UI presentation in a single file.

```javascript
const element = <h1>Hello, JSX!</h1>;
```

**JavaScript (JS):**

1.  **Syntax:** JavaScript is a programming language that provides the core functionality for web development. It's used to handle logic, data manipulation, and interactions in a web application.
2.  **Programming Logic:** JavaScript is used to implement the logic and behavior of your web application. This includes handling user input, making API requests, managing data, and more.
3.  **Manipulating the DOM:** JavaScript is used to directly manipulate the Document Object Model (DOM) of a web page. It can be used to add, modify, or remove elements from the page in response to user actions or other events.
4.  **Integration with JSX:** While JSX is used to define the structure of UI components, JavaScript is used to provide the functionality and behavior of those components. JSX and JavaScript are often used together within React components.

```javascript
const name = "JS";
const greeting = "Hello, " + name + "!";
```

## [Lifecycle](https://ishwar-rimal.medium.com/execution-sequence-of-hooks-in-react-functional-components-b4a2ef69f9b0)

## Hooks

Hooks are nothign but functions that allow you to access and use certain internal methods and features of React in functional components. Hooks provide a way to "hook into" React's core functionality without the need for class components.

### useState

This hook allows functional components to manage state. It provides a way to declare state variables and their initial values, as well as methods to update those values.

```javascript
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### useEffect

This hook is used to perform a side effect when certain thig like mounting or state update happens for a component.
We use this hook to perform operations(side effect) such as data fetching, DOM Manipulation, etc once some operation happen.
Syntax:

```javascript
import React, { useEffect } from "react";
function MyComponent() {
  //some state declaration
  useEffect(callback, dependencies);
  //callback is a callback funciton
  // dependencies are list of dependency variables
}
```

**Note:** Dependencies are optional, if no dependency is provided, this effect will get triggered with every re render of component.

**How is lifecycle handled by useEffect?**

- _`ComponentDidMount`_
  useEffect with or without dependencies are equivalent to `componentDidUpdate`. No matter what dependencies are, this will get triggerred at least once. If you want this effect to run just once, provide `[]` empty array as a dependency.
- _`ComponentDidUpdate`_
  useEffect with list of dependency is considered equivalent to `componentDidUpdate`. That is whenever the the dependency variable is updated, this effect gets triggered. (If dependency is omitted, the effect will run with every re render)
- _`ComponentDidUnmount`_
  The return function placed inside a useEffect is considered equivalient to `componentDidUnmount`. That is whenever the component gets unmounted (removed) from the DOM, this method get's triggered.

There is also an equivalent of `shouldComponentUpate` [readMore](https://github.com/ishwarrimal/frontend-interview-preps/tree/main/React/ReactInterview#purecomponents)

```javascript
import React, { useState, useEffect } from "react";

function DataFetching() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch data here and update state
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => setData(data));
    return () => {
      //Is executed when the component umounts
      console.log("Component is unmounted");
    };
  }, []);

  return (
    <div>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

[Relevant content](https://ishwar-rimal.medium.com/execution-sequence-of-hooks-in-react-functional-components-b4a2ef69f9b0)

### useMemo

- Used to memoize a value.
- Used as a **performance enhanement** by memoizing the result of expensive computation.
- It prevents unnecessary recalculations of values that don't change between renders.
  Syntax:

```javascript
const memoizedValue = useMemo(memoizationFunction, [dependencies]);
```

Here's a breakdown of how the `useMemo` hook works:

1.  You provide a function that computes a value. This function is known as the "memoization function."
2.  The memoizationFunction returns the computed value.
3.  The `useMemo` hook takes this function as its first argument.
4.  The second argument to `useMemo` is an array of dependencies. These dependencies are variables that, when changed, will trigger a re-computation of the memoized value. If the dependencies don't change between renders, the memoized value remains the same.
5.  The `useMemo` hook returns the memoized value, which you can then use in your component.

Example:

```javascript
import React, { useState, useMemo } from "react";

function ExampleComponent() {
  const [count, setCount] = useState(0);

  // Using useMemo to compute a value based on the count
  const squaredCount = useMemo(() => {
    console.log("Computing squared count");
    return count * count;
  }, [count]); // Recompute only when count changes

  return (
    <div>
      <p>Count: {count}</p>
      <p>Squared Count: {squaredCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### useCallback

Similar to useMemo, useCallback is used to memoize a function.
**Why do we need to memoize a function anyways?**
Functions defined within the component are **recreated** on each render. [Read more...](https://ishwar-rimal.medium.com/execution-sequence-of-hooks-in-react-functional-components-b4a2ef69f9b0)

```javascript
import React, { useState, useCallback } from "react";

function ExampleComponent() {
  const [count, setCount] = useState(0);

  // Using useCallback to memoize a callback function
  const handleIncrement = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

### useRef

- useRef is a quite interesting hook which usually is not utilized to it's full potential.
- useRef is used to define a local variable in a component, but unlike useState, updating the useRef variable doesn't cause re render of the component.

**Usage of useRef**
There are two usage of useRef

1. Primarily it is used for accessing the underlying DOM nodes, managing focus, or performing a dom operation on any element.

```javascript
import React, { useRef, useState } from "react";
function FocusInput() {
  const inputRef = useRef(null);
  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

In the above example, we make use of `inputRef` to access the input element and prodivde focus on that.

2. The second use case of useRef is to preserve value of something across renders:
   When it comes to preserving a value that is not affected by the re-render, we sometimes think of global variables, as it is not affected by the re-render. But using `useRef` we can achieve the same.

## Pure Components

Pure Components in react are similar to [Pure Functions](https://github.com/ishwarrimal/frontend-interview-preps/blob/main/JavaScript/JavaScript%20Advanced/readme.md#pure-functions) in JavaScript

- Pure components re-renders only when the state or the props changes.
- Does a shallow comparison of the props and state to determine whether an update is needed.
- use `React.pureComponent` or `React.memo`

```javascript
//React.pureComponent
import React, { PureComponent } from "react";
class PureExample extends PureComponent {
  render() {
    // Component rendering logic
  }
}

//React.memo
import React from "react";
const MemoizedExample = React.memo(function MemoizedExample(props) {
  // Component rendering logic
});
```

**Note:** React.memo is different from React.useMemo
**React.memo** Is a HOC to wrap a functional component. It optimizes the rendering performance of a component by preventing unnecessary re-renders.

- You can pass second parament to React.memo which is a funciton.
- This function is commonly referred to as the "areEqual" function or the "props comparison" function.
- If you don't provide this parameter, `React.memo` uses a default shallow equality comparison for props.

```javascript
React.memo(component, areEqual);
```

- `areEqual` is similar to `shouldComponentUpdate` in class components.
- The `areEqual` function takes two arguments: the previous props and the new props. It should return a boolean value indicating whether the component should re-render (`true`) or not (`false`).

```javascript
import React from "react";
function arePropsEqual(prevProps, nextProps) {
  // Custom logic to compare props
  return prevProps.id === nextProps.id;
}
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Component rendering logic
}, arePropsEqual);
```
