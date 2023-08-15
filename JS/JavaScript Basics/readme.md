# JavaScript - Basics

## Hoisting

Hoisting is a concept in JavaScript where variable and function declarations are moved to the top of their containing scope during the compilation phase, before the code is actually executed.

1. **Variable Hoisting**
   ```javascript
   console.log(x);
   var x = 10; // Prints undefined
   ```
   he code above is transformed as follows:
   ```javascript
   var x; //declaration is hoisted and initialized with undefined
   console.log(x); //undefined
   x = 10; //initialization remains in the same place
   ```
   In case of `let` or `const`
   ```javascript
   console.log(y); //Uncaught ReferenceError: y is not defined
   let y = 10;
   ```
   let and const are hoisted too, but they're not initialized with any value, hence you get ReferenceError. This is called **Temporal Dead Zone (TDZ)**
2. **Function Hoisting**
   ```javascript
   console.log(add(1, 2)); //3
   function add(x, y) {
     console.log(x + y);
   }
   ```
   When it comes to funciton, funciton is declared and initialized and is hoisted.
   ```javascript
   console.log(sub(1, 2)); //Uncaught TypeError: sub is not a function
   var sub = function (x, y) {
     console.log(x, y);
   };
   ```
   In this case, the variable sub is initiazlied with function, but during hoisting, the value of sub is undefined, hence calling () on undefined gives an error.

# Let vs Const vs Var

Let and Const are intruduced in ES6.

1.  `var`:
    - Function-scoped and globally-scoped variable declaration.
    - Hoisted with both declaration and initialization, leading to potential unexpected behavior.
    - Can be re-declared within the same scope without errors.
2.  `let`:
    - Block-scoped variable declaration that allows reassignment.
    - Hoisted with declaration only; accessing before declaration results in a ReferenceError due to the temporal dead zone.
    - Cannot be re-declared within the same scope.
3.  `const`:
    - Block-scoped variable declaration cannot be redeclared within the same scope.
    - Hoisted with declaration only; accessing before declaration results in a ReferenceError due to the temporal dead zone.
    - Must be assigned a value at the time of declaration and cannot be reassigned afterward.

# Scope

Context in which variables are declared and accessed

1.  **Global Scope**:
    - Variables declared outside of any function or block;
    - Accessible from anywhere in the code.
2.  **Function Scope**:
    - Variables declared within a function are accessible only within that function.
3.  **Block Scope**:
    - Introduced by `{}` blocks; variables declared inside a block are limited to that block's scope.
    - `Let` and `Const` follow block scope.
4.  **Scope Chain**:
    - Nested functions search for variables in their own scope, then in the scope of their parent functions, creating a chain.
5.  **Global Object Access**:
    - Variables declared without `var`, `let`, or `const` become properties of the global object (e.g., `window` in browsers).

# Strict Mode

When you enable strict mode in your JavaScript code, the JavaScript interpreter becomes less forgiving and enforces a stricter set of rules. It was introduced in ES5.

1.  Variables without var doesn't create a global variable
2.  Value of this inside a regular function is `undefined` contrary to a global context.
3.  Disallow `eval`
4.  not allow undeclared variables

```javascript
"use strict";
```

# Data Types

1. **Primitive Types**
   Number, String, Boolean, null, undefined,
   symbol, bigint -> introduced in ES6
2. **Non premitive / Reference Daa Types**
   Object, Array, Function, Date, RegExp
   Set, Map -> Introuduced in ES6

```javascript
typeof 42; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object"
typeof Symbol(); // "symbol"
typeof BigInt(123); // "bigint"
typeof {}; // "object"
typeof []; // "object"
typeof function () {}; // "function"
typeof new Date(); // "object"
typeof /pattern/; // "object"

// ES6 types
typeof new Map(); // "object"
typeof new Set(); // "object"
```

### When to use Map and Set?

**Map**

- Map is a key value pair just like Object, where key can be of any type.
- Order is preserved in Map unline Object.
- No need to handle hasOwnProperty
- Easy to iterate
- Lookup is 0(1)

```javascript
//Object
var x = {};
x.10 = 'apple' //Uncaught SyntaxError: Unexpected number

//Map
var y = new Map();
y.set(10, 'apple'); //This is allowed
```

**SET**

- Set is similar to array, but can have only unique elements

```javascript
//Regualr array
var x = [1, 1]; //This is allowed

//Using Set
var y = new Set();
y.add(1);
y.add(1); //Allowed
```

Adding duplicate value is allowed in set, but it overwrites the previous value.

# Regular Function vs Arrow Functions

Arrow function was introduced in ES6.

1.  **Syntax**:
    - Regular Function: Declared using the `function` keyword followed by a name and parameters.
    - Arrow Function: Introduced by `() =>` syntax, omitting the `function` keyword.
2.  **`this` Binding**:
    - Regular Function: Has its own `this` context, dynamically set at runtime.
    - Arrow Function: Inherits `this` from the surrounding scope, creating a lexical `this`.
3.  **Constructor**:
    - Regular Function: Can be used as a constructor to create new objects with the `new` keyword.
    - Arrow Function: Cannot be used as a constructor.
4.  **Arguments Object**:
    - Regular Function: Has its own `arguments` object containing all passed arguments.
    - Arrow Function: Does not have its own `arguments` object; inherits from the enclosing scope.
5.  **`return`**:
    - Regular Function: Requires an explicit `return` statement for multi-line blocks.
    - Arrow Function: Implicitly returns single expressions without the need for a `return` statement.
6.  **No Prototype**:
    - Arrow Function: Does not have its own `prototype` property, hence cannot be used as a prototype constructor.

# Arguments in a Function

1. **Parameters**
   - Parameters are placeholders in the function declaration that define the expected input values.
2. **Arguments**:
   - Arguments are the actual values passed to a function when it is invoked.
3. **Number of Arguments**:
   - JavaScript functions can be called with any number of arguments, regardless of the number of parameters defined.
4. **Default Values**:
   - Function parameters can have default values assigned, which are used when the corresponding argument is not provided.
   ```javascript
   function addValues(x=1, y=1){console.log(x+y}
   addValues() //2
   ```
5. **Arguments Object**:
   - Functions have an `arguments` object that holds all passed arguments, even if they are not explicitly defined as parameters.
   ```javascript
   function addValues(){
       let arg = [...arguments]
       arg.reduce((val, acc) => val+acc))
   }
   addValues(1,2,3) // 6
   ```
   The `arguments` object is not an array, but is an array-like object that holds all the arguments passed to a function, but it does not inherit array methods like `forEach`, `map`, or `filter`.
6. **Rest Parameters**:
   - Introduced in ES6, rest parameters allow functions to accept an arbitrary number of arguments as an array.
   ```javascript
   function addValues(...arg){
       arg.reduce((val, acc) => val+acc))
   }
   addValues(1,2,3) // 6
   ```
7. **Spread Operator**:
   - The spread operator (`...`) can be used to pass an array's elements as separate arguments to a function.
   ```javascript
   function addValues(...arg){
       arg.reduce((val, acc) => val+acc))
   }
   let values = [1,2,3]
   addValues(...values) // 6
   ```
   Note: This is just a trivial example to show the use of spread operator.
8. **Order Matters**:
   - Arguments are matched to parameters based on their order, so the first argument corresponds to the first parameter, and so on.
9. **Callback Functions**:
   - Functions can accept other functions as arguments, allowing for powerful patterns like callbacks and higher-order functions.
   ```javascript
   function performOperation(x, y, cb) {
     const result = cb(x, y);
     console.log(result);
   }
   function add(x, y) {
     return x + y;
   }
   performOperation(1, 2, add); // 3
   ```

# Event Listeners

In JavaScript, event listeners are functions that "listen" for specific events to occur on a DOM element (such as a button, input, or any HTML element).

```javascript
const myBtn = document.getElementById("myButton");
myBtn.addEventListener("click", function () {
  //do something
});
```

# Event Propagation

Event Propagation refers to the order in which events are handled and propagated through the DOM hierarchy in JavaScript. Every (almost) event propagates.
There are two phases of event propagation:

1. **Bubbling**

- In this phase, the event starts at the target element and bubbles up through the DOM hierarchy to the outermost ancestor element.
- This phase allows you to set up event listeners on the target element or its descendants to respond to events as they propagate upward. -> _evet delegation_
-

2. **Capturing**

- In this phase, the event is captured by the outermost ancestor element and is propagated downward through the DOM hierarchy towards the target element.
  _Note:_ By Default, events always Bubble.
  You can also explicitly set an event listener to capture events during the capturing phase by passing a third parameter (`true`) to the `addEventListener` method:

```javascript
ele.addEventListener(
  "click",
  function () {
    console.log("Ele clicked during capturing phase");
  },
  true
);
```

# Event Delegation

Sometimes you would want to add event listener to the parent instead of individual child element. You use event delegation for that.

```javascript
<ul id="list">
  <li>Item 1</li>
  <li id="item2">Item 2</li>
  <li>Item 3</li>
</ul>;

const list = document.getElementById("list");
list.addEventListener("click", function (event) {
  if (event.target.id === "item2") {
    console.log("Item 2 clicked:");
  }
});
```

The idea is to take advantage of event bubbling: when an event occurs on a child element, it bubbles up through its ancestors in the DOM tree, allowing a parent element to intercept and handle the event.

Event delegation is particularly useful in scenarios where new elements are dynamically added to the DOM or when working with lists, tables, or other structures with repetitive elements.

# DOM Manipulation

DOM (Document Object Model) manipulation involves programmatically changing the structure, content, or style of a web page using JavaScript.
This is the main purpose of JavaScript.
Consider the code below

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation Example</title>
  </head>
  <body>
    <h1 id="title">Title 1</h1>
    <button id="changeButton">Change Title</button>
    <script src="script.js"></script>
  </body>
</html>
```

Let's see a JS code that changes the title on click of the button

```javascript
// Get references to the elements
const titleElement = document.getElementById("title");
const changeButton = document.getElementById("changeButton");

// Add a click event listener to the button
changeButton.addEventListener("click", function () {
  // Update the text content of the title element
  titleElement.textContent = "New Title";
});
```

# EVAL

`eval` is a built-in JavaScript function that allows you to evaluate and execute a string of JavaScript code in the current _scope_.
Example:

```javascript
const x = 10;
const y = 20;
const code = "x + y"; // A string containing JavaScript code
const result = eval(code); // Evaluate the code and store the result in 'result'
console.log(result); // Output: 30
```

**Eval is Evil**
However, it's important to note that using `eval` has some potential downsides and security concerns:

1.  **Security Risk**: Using `eval` with untrusted or user-generated input can expose your application to security vulnerabilities, as arbitrary code could be executed.
2.  **Performance Impact**: The use of `eval` can have performance implications, as the JavaScript engine can't optimize the code containing `eval` as effectively as regular code.
3.  **Maintainability**: Code that heavily relies on `eval` can become difficult to read, debug, and maintain.
    It's advised never to use eval.
    **Are there any alternative to eval?**
    There are many alternatives to eval, one of the most practical alternative is to use function constructor.

```javascript
const addFunction = new Function("x", "y", "return x + y;");
const result = addFunction(10, 20); // Evaluates to 30
```

# Template Literal

Template literals provide a more readable and convenient way to create complex strings by allowing you to embed variables directly into the string content without the need for string concatenation or escaping characters.

- Introduced in ES6
- More readable.
- Easy to append concatinate strings.

```javascript
let name = "Ish";
//Before
console.log("My name is" + name);
//After
console.log(`My name is ${name}`);
```

- Easy to create HTML elements.

```javascript
let name = "Ish";

//before
let div = document.createElement("div");
let p = document.createElement("p");
p.innerText = "My name is Ish" + name;
div.append(p);
document.querySelector("body").appendChild(div);

//After
const myDiv = `<div><p>My name is ${name}</p></div>`;
document.querySelector("body").innerHTM = myDiv;
```

# IIFE

IIFE stands for Immediately Invoked Function Expression.
It's a JavaScript design pattern that involves defining a function expression and immediately invoking it. IIFEs are often used to create a private scope for variables, prevent variable name clashes, and encapsulate code.

```javascript
(function () {
  // Code inside the IIFE is enclosed within its own scope
  const message = "Hello from the IIFE!";
  console.log(message);
})();
```

- Prevents polluting global scope.
- Used by popular libraries like jQuery, Underscore.js, etc.

# Error Handling - try catch

- Detect, manage, and recover from unexpected or exceptional situations that may arise during the execution of a program.
- The `try...catch` statement is used to catch and handle errors in JavaScript code.
- It consists of a `try` block where you place the code that might generate error.
- If an error occurs within the `try` block, the control is transferred to the corresponding `catch` block.
- The `catch` block contains code that runs when an error is caught. It usually includes error handling logic.
- The `catch` block takes an optional parameter, conventionally named `error`, which represents the error object associated with the caught error.
- You can include an optional `finally` block after the `try` and `catch` blocks.
- The code in the `finally` block runs regardless of whether an error occurred or not. It is often used for cleanup tasks.
- Within the `catch` block, you can rethrow the error using the `throw` statement to let outer `try...catch` blocks handle the error further.

```javascript
try {
  //Some code that throws error
} catch (error) {
  console.error("Error caught:", error.name, error.message);
}
```

You can throw **custom errors** in JavaScript by using the `throw` statement.
Example below demonstrates a proper use case.

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}
try {
  const result = divide(10, 0);
  console.log(result);
} catch (error) {
  console.error("An error occurred:", error.message);
}
```

# Memoization

- Used to cache the already computed value.
- For next execution, if the value exists in cache, if not, compute the value and store in cache.

```javascript
function  memoizeSquare(fn) {
	const cache = {};
	return  function(x) {
		if (x in cache) {
			return cache[x];
		}
		const result = fn(x);
		cache[x] = result;
		return result;
		};
	}
}

// Create a memoized version of the square function
const memoizedSquare = memoizeSquare(function(x) {
	console.log('Calculating square of', x);
	return x * x; }
);
console.log(memoizedSquare(5)); // Outputs: Calculating square of 5 \n 25
console.log(memoizedSquare(7)); // Outputs: Calculating square of 7 \n 49
console.log(memoizedSquare(5)); // Outputs: 25 (Cached result)
console.log(memoizedSquare(10)); // Outputs: Calculating square of 10 \n 100
```
