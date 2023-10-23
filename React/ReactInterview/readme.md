# React

React is a JavaScript library for building user interfaces. It was developed by Facebook and released as an open-source project. React is primarily used for building single-page applications (SPAs) and mobile applications, although it can also be used for creating specific components within larger web applications.

## Why React?

React has following advantage over traditional way of building web apps.

1.  **Component based architecture**
    - Modular code.
    - Reusability.
    - Easeir to test and maintain.
2.  **JSX**
    - Closely resembels HTML.
    - Better way to handle UI Logic.
3.  **Virtual DOM**
    - Efficiently update the DOM.
    - Minimise expensive dom manipulation by first updating the virtual DOM.
4.  **Unidirection data flow**
    - Data flows from parent to the children.
5.  **State Management**
    - State management for larger applicaiton is very difficult in traditional applications.
    - Easier to manage the state of the applcation with React.
6.  **Developer Ecosystem**
    - Numerous tutorials available.
    - Numerous libraries available.
7.  **React Native**
    - Use react skills to build mobile app using React Native.

## JSX vs JS

Not a valid comparison as JSX is only limited to React ecosystem while JS is a programming language supported by all the browser and JS Runtime like Nodejs.

JSX is a syntax extension that simplifies the creation of user interfaces in React by allowing developers to write HTML-like code within their JavaScript files.

**JSX (JavaScript XML):**

1.  **Syntax:** JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files.
2.  **Readability:** JSX can make code more readable and intuitive, as it closely resembles the structure of the UI.
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

Hooks are nothing but functions that allow you to access and use certain internal methods and features of React in functional components. Hooks provide a way to "hook into" React's core functionality without the need for class components.

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

1. You provide a function that computes a value. This function is known as the "memoization function."
2. The memoizationFunction returns the computed value.
3. The `useMemo` hook takes this function as its first argument.
4. The second argument to `useMemo` is an array of dependencies. These dependencies are variables that, when changed, will trigger a re-computation of the memoized value. If the dependencies don't change between renders, the memoized value remains the same.
5. The `useMemo` hook returns the memoized value, which you can then use in your component.

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

## Higher Order Component

- Higher-Order Component (HOC) is a design pattern used for enhancing the functionality or behavior of a component by wrapping it in another component.
- Higher Order Component in react are similar to Higher Order Functions in JavaScript.
- Higher-order functions are functions that can accept other functions as arguments or return functions as their results, similarly, Higher-order components are components that can accept other compoentnts as arguments or return components as their results.
- Example of Higher Order Functions - Array.Map - Array.Reduce - etc
  Example in react:

```javascript
import React from "react";
// Define a Higher-Order Component (HOC)
const withLogger = (WrappedComponent) => {
  return function WithLogger(props) {
    console.log(`Component ${WrappedComponent.name} is rendering.`);
    return <WrappedComponent {...props} />;
  };
};
// Functional component

function Greeting1(props) {
  return <div>Hello, {props.name}!</div>;
}

function Greeting2(props) {
  return <div>Hey, {props.name}!</div>;
}

// Wrap the Greeting component with the withLogger HOC

const Greeting1WithLogger = withLogger(Greeting1);
const Greeting2WithLogger = withLogger(Greeting2);

export { Greeting1WithLogger, Greeting2WithLogger };
```

We use HOC mostly when same logic is resued/required in more than one component.

In the above example, as you can see, the logic to `console log` is common for both the component, hence we use HOC for this.

Some usage of HOC includes:

1.  **Code Reuse**: You can use HOCs to extract common logic from multiple components into a single reusable HOC.

2.  **State and Props Manipulation**: HOCs can modify or add props to the wrapped component based on some conditions or data from a data source like Redux or a context provider.

3.  **Authentication and Authorization**: You can use HOCs to handle authentication and authorization logic, ensuring that only authorized users can access certain components or routes.

4.  **Logging and Analytics**: HOCs can be used to log events or send analytics data whenever a component renders or performs a specific action.

## Render Props

As the name suggests, when you pass `render` function as a `props` to a Component, you achieve render props.

```javascript
<MyComponent render={someRenderFunction} />
```

- Similar to HOC, this is also a design pattern that focuses on reusability of code.

- A component after executing it's local logic, invokes the passed render function in the props to render a component.

```javascript
...
	return  props.render(someState)
}
```

Example:

```javascript
import React from "react";
// A functional component that takes a render function as a prop
function Counter(props) {
  const [count, setCount] = React.useState(0);
  // Call the render function and pass the current count
  return props.render(count, setCount);
}
// Usage of the Counter component
function App() {
  return (
    <div>
      <h1>Counter Example</h1>
      <Counter
        render={(count, setCount) => (
          <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
          </div>
        )}
      />
    </div>
  );
}
export default App;
```

As you can see in the above example, the logic to handle the increment and decrement is handled by the Counter component.

**Difference between HOC and render props**

- **HOC (Higher-Order Component)**:

  - HOCs are functions that accept a component as an argument and return a new component with added or modified behavior.

  - They are implemented as wrapper components that encapsulate the logic and state management.

- **Render Props**:

  - Render props involve passing a function as a prop to a component. This function is used by the component to render part of its UI.

  - Render props are implemented by passing a function as a prop to a component, which the component then invokes.

## Error Handling

Apart from using the regular `try...catch`, react provides inbuild methods to handle the error states.
React exposes two methods to handle the error state:

1. componentDidCatch.
2. getDerivedStateFromError.

Thing to note here is that these methods are supported only in a `class` based component and is not yet supported in `function` based component.

- This implementation is also called as creating an **error boundary.**
- This component can catch error that occur in any of the child component.
- You can have other functional component wrapped in this class component.
  Example:

```javascript
import React, { Component } from "react";
class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // Log the error or send it to an error tracking service
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // Render an error message or a fallback UI
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
```

Here's a summary of the sequence:

1. An error occurs within a component wrapped by an error boundary.
2. React calls the static `getDerivedStateFromError` method of the error boundary component, passing the error as an argument. If this method returns an object with updated state (e.g., setting `hasError` to `true`), the component's state is updated.
3. After state is updated, React calls the instance method `componentDidCatch` of the error boundary component, passing both the error and the error info as arguments.

Both methods serve distinct purposes:

- `getDerivedStateFromError` is used for updating the component's state based on the error. It's a static method and should not have side effects. It's primarily used for setting a flag (e.g., `hasError`) in the state.

- `componentDidCatch` is used for performing additional actions or side effects in response to the error. It can be used to log the error, send it to an error tracking service, or customize the rendering of an error message.

**Why do we need to handle error in react?**
In React, When an error occurs and it's not handled gracefully, users may see a blank or broken page, leading to frustration and confusion.

## Virtual DOM

- Virtual DOM or VDOM is a representation of the actual DOM that React maintains to optimize the render and re render of the UI.

- It's a concept and data structure that React uses to optimize the process of updating the actual DOM when changes occur in a web application.

- When the update in any state or props happen, React first updates the Virtual DOM and then goes on updating the actual DOM.

- This might seem like an extra work compared to updating the DOM directly, but when the changes happen in a batch, this way turns out to be efficient than updating the actual DOM.

- We will diecuss more about how React does optimizes the UI re render in the following topic on React Reconciliation and React fiber.

## React Reconciliation and React Fiber

**What is react reconciler?**
React reconciler is a core process that React uses to efficiently update the UI when any change in state or props is encountered.

**What is react fiber?**
In concrete terms, a fiber is a JavaScript object that contains information about a component, its input, and its output. This object is the internal representation of the Components, which contains of type, keys, child, sibling, etc, of the component.
Using this, React can efficiently identifies the change in DOM and achieve performance optimization.

**When was react fiber introduced?**
React fiber was introduced in React v16, which was released on September 26, 2017.

**What was used by reconciler before react fiber?**
Before react fiber, React used stack-based approach for reconciliation, was also called stack reconciler. This approach has **Limited Concurrency**, it use dot **Blocking Main Thread** and hence was slow.

**How does React reconciliation work?**

1. During the initial render, React creates a **Virtual DOM**. This is a replica of the actual DOM (This is not part of reconcilliation).
2. When any **update** happens of the state or props, react re-renders the affected component and generates a new VDOM.
3. React then compares the new VDOM with the older VDOM. React uses **Diffing Algorithm** to achieve this. (more on diffing algorithm here)
4. React aims to find the minimum number of changes required to update the actual DOM to match the new virtual DOM.
5. Once React has identified the difference, it efficiently updates the acutal DOM.

There are 2 phases in which all of these happens. Read about them [here](https://medium.com/@ishwar-rimal/execution-sequence-of-hooks-in-react-functional-components-b4a2ef69f9b0)

## More on Diffing Algorithm:

- Diffing algorithm has time complexity of O(n) compared to traditional O(n3).

- The Diffing algorithem works on following assumptions:

1.  **Tree Structure Assumption**: React assumes that the structure of the virtual DOM tree remains relatively stable between renders. This means that if a parent and child component have not changed, React can make the assumption that their children have not changed either, allowing it to skip unnecessary checks.

2.  **Component Type Assumption**: React assumes that components of the same type represent the same logical element across renders. This is why it compares elements of the same type by their position in the tree and their props.

3.  **Keyed Elements Assumption**: When rendering lists of elements, React assumes that elements within the list have a unique "key" prop that identifies them across renders. Using keys helps React determine which elements have been added, removed, or changed within a list efficiently.

4.  **Depth-First Search**: React's diffing algorithm performs a depth-first traversal of the virtual DOM tree. It starts at the root and compares elements as it goes deeper into the tree. This approach helps React identify differences in the tree structure efficiently.

5.  **Element Key Assumption**: React assumes that the "key" prop is stable across renders for the same element. If the key of an element changes between renders, React treats it as a new element, which can result in unnecessary updates.  

**NOTE** During the reconciliation, if the new and the old element are of different type (old was `<a>` new is `<href>`, old was `<p>` new is `<span>`), then the old child is unmounted (state is released) and new component is mounted (state is re initialized) and the entire subtree is re constructed. Whereas, if the type is same (prev `<p>`, new `<p>`) with a slight change in the attributes, then only the attributes are updated. React uses the same render tree. No unmount/remount happens.

## Flux

- Flux is an architectural pattern for managing the flow of data in a web applicaiton.
- Flux is based on unidirection flow of data.
- In a complex web application, the state of the app is stored in one single place called "STORE".
- All the components of the application susbscribe to the data in the "STORE"
- Follows the following sequence
- User interacts with the UI.
- It triggers an actions.
- Actions notifies the "STORE" about the action.
- Stores update their data and notify all the components about the update.
- UI re-render based on the udpated data.

## REDUX

_Note: I assume that you know the syntax and usage of redux, if not please follow [this article](https://redux.js.org/introduction/examples)_

- Redux is a state management library commonly used in React. It is based on flux architecure.
- Redux is especially useful in complex React applications where multiple components need access to shared data.

**Core Concepts of Redux (similar to that of flux):**

1.  **Store:** The central piece of Redux is the store. It holds the entire state of your application in a single JavaScript object. Consider store as a global state, a source of truth for your application. (learn more aobut state [here](https://medium.com/@ishwar-rimal/what-the-hell-is-state-in-web-applications-f529aa4cf6e1) )

2.  **Actions:** Actions are plain JavaScript objects that describe events or changes in your application. The job of action is to inform reducer that some action has been triggered and also pass some relavant data. They have a `type` property that indicates the type of action and can also carry additional data.

3.  **Reducers:** Reducers are functions that specify how the application's state should change in response to actions. They take the current state and an action as input and return a new state. Reducers are pure functions, meaning they produce the same output for the same input and have no side effects.

4.  **Dispatch:** To trigger a state change, you dispatch an action to the store. The store then forwards the action to the reducers, which calculate the new state based on the action's type and payload.

5.  **Subscribe:** Your components subscribe to the store to listen for changes in the state. When the state changes, the subscribed components are notified, allowing them to update their views accordingly.

**Why are Reducer pure funcitons?**

1.  **Predictability**: This predictability is crucial in Redux because it ensures that given the same state and action, a reducer will consistently produce the same new state.
2.  **Immutability:** Reducers typically return a new state object rather than modifying the existing one. This promotes immutability, a practice that helps prevent unintended side effects and makes it easier to track changes in the application's state over time.

## Middlewares in redux

**Common use of middleware -> Updating store asynchronously**
Suppose on clicking a button, you want to make an API call and then update the store based on the response, you do the following:

1. Dispatch action from the view for the click of button.
2. This action doesn't immediately update the store, i.e. doens't reach reducer immeidately.
3. You make use of middleware like `redux-thunk` to make the api call and call the reducer once you receive the response.

Step 3 is an asychchronous process.

- Middleware in general is a software layer or component that sits between different part of an application.
- Middleware allows you to intercept, modify, or augment actions and state changes.
- Middleware sits between the dispatching of an action and the moment it reaches the reducers, giving you the ability to add custom behavior to your Redux application.
- **Thunk** middleware is commonly used in Redux applications to handle asynchronous actions.
- The primary use of thunk middleware is to delay the dispatching of an action until a certain condition is met or an asynchronous operation is completed. It enables you to have more control over the flow of your Redux actions and handle complex asynchronous logic.

Example:

```javascript
export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

// Action creator with Redux Thunk
export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};
```

## useReducer

useReducer is an inbuilt hook provided by `React` to handle the complex state management previously done using external library like `Redux`.

It is often used as an alternative to `useState` when you need to handle more advanced state management scenarios.

Here's a table comparing `useReducer` and Redux across various aspects:

| Aspect                   | `useReducer`                                  | Redux                                         |
| ------------------------ | --------------------------------------------- | --------------------------------------------- |
| **Type**                 | React built-in hook                           | External state management library             |
| **Local vs. Global**     | Typically used for local component state      | Designed for global state management          |
| **Use Case**             | Small to medium-sized apps, local state       | Large and complex apps, global state          |
| **Setup**                | No external dependencies required             | Requires installing Redux and middleware      |
| **Component Coupling**   | Tends to couple state logic with components   | Promotes decoupling of state and components   |
| **State Access**         | State is local to the component               | State is globally accessible across app       |
| **Asynchronous Actions** | Not built for handling async actions directly | Supports middleware for async action handling |
| **Complexity**           | Simpler and lightweight                       | More structured, suited for complexity        |
| **Boilerplate**          | Less boilerplate code required                | More boilerplate, but structured              |
| **Development Tools**    | No built-in dev tools                         | Redux DevTools for state inspection           |

Example:

```javascript
import React, { useReducer } from "react";
// Define a reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

function Counter() {
  // Initialize state using useReducer
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
}
export default Counter;
```

[Read more about useReducer](https://react.dev/reference/react/useReducer)

## Context API

- Context API comes into picture in situations where a data needs to be passed from one component to it's children and further below on it's hierarchy.

- `Props Drilling` is one of the naive way to achieve this, in which a component passes a data to it's child as a prop and that child passed it to it's child as it's prop and so on.

```javascript
function  SomeComponent(){
	const [data,] = useState('Apple')
	//Data originates here
	return (
		<Component1  data={data}>
			<Child  data={data}>
				<Child2  data={data}>
				//This component actually uses the data
				</Child2>
			</Child>
		</Component1 />
	)
}
```

- Other way to achieve this is by using `redux`, in which you dispatch and subscribe to the central store from within a component.

- `useContext` is a built in hook in react that helps you achieve this without having to use any other complex methods.

Key features and components of the Context API include:

1.  **`createContext`:** The `createContext` function is used to create a new context object. This context object has two components associated with it: `Provider` and `Consumer`.

2.  **`Provider`:** The `Provider` component is used to wrap a portion of your component tree and makes the context data (state) available to all components within that tree. It accepts a `value` prop, which specifies the data that should be shared.

3.  **`Consumer`:** The `Consumer` component allows you to access the context data within your components. You can use the `Consumer` component either as a render prop or as a function component with a context value.

4.  **`useContext `:** Within `Consumer` you have to make use of `useContex` hook to access the passed data.

Example:

(Again, this is not a tutorial, so I assume you know the syntax. This is just a preperation guide for interview)

```javascript
import React, { createContext, useContext, useState } from "react";
// Create a new context
const MyContext = createContext();
// Define a provider component
function MyProvider({ children }) {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <MyContext.Provider value={{ count, increment }}>
      {children}
    </MyContext.Provider>
  );
}

// Example component that uses context
function Counter() {
  const { count, increment } = useContext(MyContext);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// App component
function App() {
  return (
    <MyProvider>
      <Counter />
    </MyProvider>
  );
}

export default App;
```

**Note** : By using `useReducer` and `Context API` you can eliminate the use of `Redux` to manage state even in a complex applications.

## Controlled vs Uncontrolled Components.

- There are no strict technical term for controlled or uncontrolled compoents, but it is highly recommendted to understand when a component becomes controlled and when it becomes uncontrolled.

- When a component handles it's own local state, then it can be called as `uncontrolled component` and in the case when a parent component handles the state of it's child componenet, then the child component can be called as a `controlled component`

Controlled and uncontrolled components are usually easier to understand when managing form inputs in React.

**Controlled Components:**

- When you make use of `React's` internal implementation to handle the update in the state of the input, it becomes a controlled component.

**Example:**

```javascript
import React, { useState } from "react";
function ControlledInput() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return <input type="text" value={inputValue} onChange={handleInputChange} />;
}
```

Benefits: You can validate, manipulate, or perform actions based on the input value easily.

**Uncontrolled Components:**

- When the value of the input field is managed by the DOM itself, then it becomes uncontrolled component.
- Uncontrolled components often use React `refs` to access the DOM element directly and read its value when needed.

3.  **Example:**

```javascript
import React, { useRef } from "react";
function UncontrolledInput() {
  const inputRef = useRef(null);
  const handleButtonClick = () => {
    alert(`Input value: ${inputRef.current.value}`);
  };
  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={handleButtonClick}>Alert Value</button>
    </>
  );
}
```

Benefit: Uncontrolled components can be simpler to set up for simple scenarios where you don't need to manage the input's value through React state. They can also be faster since there's no need to re-render the component on each input change.

## Built-in React Components

React provides 4 built in components namely:

1.  `<StrictMode />`

2.  `<Profiler />`

3.  `<Suspense />`

4.  `<Fragment />`

More about these in the following section

## `<UseStrict />`

- Similar to `strict mode` in JavaScript, this component helps you find bugs early during development.
- You have to wrap your component within `<UseStrict /> ` to enale strict mode.
- There are 3 features enabled by UseStrict
- [Video Reference](https://www.youtube.com/watch?v=UjWz2cWstZI&t=11s)

1.  `re-render` the component to make sure that there are no imupurities:

    - React expects all functional component to be a pure functions.
    - During th re-render it checks if the output of first and the second render are same or not, if not, it gives warning as it's not the expeted behaviour
    - Read more [here](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-double-rendering-in-development)

2.  re-run Effects an extra time to find bugs caused by missing Effect cleanup.

    - During the second setup, it makes sure that the cleanup of first effect has taken place, if not, it will throw warning.
    - Read more [here](https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development)

3.  Check for the use of any depricated API. [read more](https://react.dev/reference/react/StrictMode#fixing-deprecation-warnings-enabled-by-strict-mode)

NOTE that this will be enabled only during development.

## `<Fragment />`

- Often used via `<>...</>` syntax, lets you group elements without a wrapper node.

- As react supports returning only one element, at cases when there are more than one elements, it requires you to wrap the elements within some other element like div.

- To avoid using `<div>` or any other such element as a wrapper, you can use Fragment.

## `<Suspense />`

- Lets you display an alternate UI (fallback) until its children have finished loading.

Exampl:

```javascript
import { Suspense } from "react";
import Albums from "./Albums.js";

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
```

Note:

`<Suspense />` is mostly used while lazy laoding the component.

## `<Profiler />`

- This is one of the most useful component for developers to measure the performance of a React tree programatically.

- By default this is deisabled in Prod.

Syntax:

```javascript

funciton  onRender(id, phase, actualDuration, baseDuration, startTime, commitTime){

}



<Profiler  id="app"  onRender={onRender}>

<YourComponent  />

</Profiler>

```

On every render, the `onRender` function gets called with the follwowing parameters:

- `id`: The string `id` prop of the `<Profiler>` tree that has just committed. This lets you identify which part of the tree was committed if you are using multiple profilers.

- `phase`: `"mount"`, `"update"` or `"nested-update"`. This lets you know whether the tree has just been mounted for the first time or re-rendered due to a change in props, state, or hooks.

- `actualDuration`: The number of milliseconds spent rendering the `<Profiler>` and its descendants for the current update. This indicates how well the subtree makes use of memoization (e.g. [`memo`](https://react.dev/reference/react/memo) and [`useMemo`](https://react.dev/reference/react/useMemo)). Ideally this value should decrease significantly after the initial mount as many of the descendants will only need to re-render if their specific props change.

- `baseDuration`: The number of milliseconds estimating how much time it would take to re-render the entire `<Profiler>` subtree without any optimizations. It is calculated by summing up the most recent render durations of each component in the tree. This value estimates a worst-case cost of rendering (e.g. the initial mount or a tree with no memoization). Compare `actualDuration` against it to see if memoization is working.

- `startTime`: A numeric timestamp for when React began rendering the current update.

- `endTime`: A numeric timestamp for when React committed the current update. This value is shared between all profilers in a commit, enabling them to be grouped if desirable.
