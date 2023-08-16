# JavaScript Advanced

## Mutability vs Immutability

**Mutability** : A _mutable_ value is one that can be changed without creating an entirely new value. **Immutability** : An immutable value is one whose content cannot be changed without creating an entirely new value.
All primitive types in JavaScript are immutable.

### Immutable types

1.  **String**:
2.  **Number**:
3.  **Boolean**:
4.  **Undefined**:
5.  **Null**:
6.  **Symbol**:

Once a primitive value is created, it cannot be changed, although the variable that holds it may be reassigned another value.

Immutable types are _pass by value_ meaning when you copy the value of a primitive data, it's value is stored in a new memory location.

```javascript
let.x = 10;
let y = x;
```

In the above case, both x and y refer to a differnet memory location with value 10 in it.

### Mutable types

1. **Object**
2. **Array**

In mutable types, updating the variable acutlly updates the value.

```javascript
let arr = [1, 2, 3];
arr.push(4); //This operation actually updates the value stored in the variable.
```

Mutable types are _pass by reference_ meaning when you copy the value of a non primitive data, the reference(memory address) of the first variable is copied.

```javascript
let arr = [1, 2, 3];
let arr1 = arr;
```

In the above case, both arr and arr1 refer to the same memory location where `[1,2,3]` is stored.
If we update the value in any one of the variable, the other get's the updated value.

```javascript
let arr = [1, 2, 3];
let arr1 = arr;
arr1.push(4);
console.log(arr1);
console.log(arr);
```

In the above case, both will print `[1,2,3,4]`

# Callback and Callback Hell

- A function that is passed as an argument to another function.
- Can be executed with or without arguments.
- It allows other code to run in the meantime and prevents any blocking.
- Mostly used to perform asynchronous work.

Here's a simple example to illustrate the concept:

```javascript
function fetchData(callback) {
  setTimeout(function () {
    const data = { name: "Ish", age: 30 };
    callback(data);
  }, 1000); // Simulating an asynchronous operation
}

function processData(data) {
  console.log("Processing data:", data.name);
}

fetchData(processData);
```

## Callback hell

- Multiple nested callbacks make the code difficult to handle.
- Series of async operation depending on each other.
- Also called 'pyramid of doom'

Example:

```javascript
asyncFunction1(function (result1) {
  asyncFunction2(result1, function (result2) {
    asyncFunction3(result2, function (result3) {
      // ... and so on
    });
  });
});
```

This causes multiple issues in terms of readability, error handnling and scalability, hence we make use of another concept called `promise` to handle such situation.

# Promise

- A _promise_ is a proxy of value that is not necessarily know at the time of cration of the promise. (what is proxy? Will discuss later)
- It can be in 3 states: Pending, Fulfilled, Rejected.
- Promises can be chained.
- It has 3 methods: `then`, `catch` and `finally`

### Creating a Promise

- Syntax: `new Promise(executorFunction)`
- ExecutorFunction thats two parameters: `resolve` and `reject`
- Resolve is used when the operation is success.
- Reject is used when the operation failed.

A sample example:

```javascript
function executorFunction(resolve, reject) {
  try {
    //Do some async work (or sync)
    setTimeout(() => {
      const data = "Apple";
      resolve(data);
    }, 2000);
  } catch (e) {
    reject(e);
  }
}

const myPromise = new Promise(executorFunction);
```

Usage:

```javascript
myPromise()
  .then((data) => {
    console.log("Data:", data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

#### Three phases:

- Pending : Initial state, neither fulfilled nor rejected.
- Fulfilled: Operation was completed successfully.
- Rejected: Operation failed.

#### Three methods

- then : In case of resolved promise, control comes to then block.
- catch : In case of a failed promise, control comes to the cach block.
- finally : In every case, finally will always be executed at last.

NOTE: Each `.then()` returns a newly generated promise object, which can optionally be used for chaining; for example:

### Chained Promise

```javascript
myPromise
  .then(handleFulfilledA, handleRejectedA)
  .then(handleFulfilledB, handleRejectedB)
  .then(handleFulfilledC, handleRejectedC);
```

### Important Note

- .then and .catch are both `thennable` meaning, they both return a new promise which can be chained.
- If .then is a success, it goes to the next .then
- If .then throws any error, it goes to the next .catch.
- If .catch is a success, it goes to the next .then
- If .catch throws any error, it goes to the next .catch
- It follows this pattern till it reaches finally.
- .finally is reached in both the case.

### Other Major Promise methods:

1. **Promise.all**: Waits for all promises to resolve or any to reject, returning an array of results.
2. **Promise.race**: Waits for the first promise to resolve, ignoring rejections until all fail.
3. **Promise.any**: Resolves or rejects with the value of the first promise to settle (either resolve or reject).

Even though promise is a better alternative to callbacks, in ES6, a new concept called `Async Await` was introduced.

# Async Await

1.  **Synchronous Look**: Provides a synchronous-like syntax for handling asynchronous operations.
2.  **Awaiting Promise**: Pauses execution until a promise is resolved, then returns its value.
3.  **Error Handling**: Simplifies error handling with try/catch blocks around asynchronous code.
4.  **Sequential Logic**: Easily chain and await multiple async calls for sequential logic.
5.  **Modern Alternative**: Offers cleaner code compared to nested callbacks or chaining `.then()`.

Example:

```javascript
async function fetchData() {
  try {
    const data = await fetchAPI();
    const processedData = await process(data);
    doSomething(data);
  } catch (error) {
    handleError(error);
  }
}
```

### Difference between async await and promise

There is a very subtle difference when it comes to the execution of these two concepts.

With async wait, the execution of a function stops when it witnesses the await statement and moves out of the function until the async process is completed.
Whereas with promise, the execution continues in the same function, it just skips the promise statement until the async process is completed.

Example:

```javascript
//With Promise
function doSomething() {
  console.log(1);
  somePromise.then((x) => console.log(2)).catch(); //Some promise that resolves with 2
  console.log(3);
}
doSomething();
console.log(4);

//Output
1, 3, 4, 2;
```

```javascript
//With Async Await
async function doSomething() {
  console.log(1);
  const resp = await somePromise(); //Promise resolves with
  console.log(resp);
  console.log(3);
}
doSomething();
console.log(4);
//Output
1, 4, 2, 3;
```

# Prototype

- Prototypes are the mechanism by which JavaScript objects inherit features from one another.
- Every object in JavaScript has a built-in property, which is called its **prototype**
- The prototype is itself an object, so the prototype will have its own prototype, making what's called a **prototype chain**.
- The chain ends when we reach a prototype that has `null` for its own prototype.

```javascript
const person = {
	name: "Ish",
	getName(){
		console.log(`My name is ${this.name}`)
	}
}
console.log(person.getName())
//Output
My name is Ish
```

As we can see, `getName` is a method inside person object, so person.getName() gives me the desired output.
But what if I do something like

```javascript
person.toString();
//Output
("[object Object]");
```

As you can see, `toString()` on the object `person` is not throwing error, rather it's giving me a unwanted value.
This is possible because the method `toString()`belongs to the prototype of the object person.

When you try to access a property of an object: if the property can't be found in the object itself, the prototype is searched for the property. If the property still can't be found, then the prototype's prototype is searched, and so on until either the property is found, or the end of the chain is reached, in which case `undefined` is returned.

If I try to access the prototype of the object person, I get following results:

```javascript
1.  {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
1.  constructor: ƒ Object()
2.  hasOwnProperty: ƒ hasOwnProperty()
3.  isPrototypeOf: ƒ isPrototypeOf()
4.  propertyIsEnumerable: ƒ propertyIsEnumerable()
5.  toLocaleString: ƒ toLocaleString()
6.  toString: ƒ toString()
7.  valueOf: ƒ valueOf()
8.  __defineGetter__: ƒ __defineGetter__()
9.  __defineSetter__: ƒ __defineSetter__()
10.  __lookupGetter__: ƒ __lookupGetter__()
11.  __lookupSetter__: ƒ __lookupSetter__()
12.  __proto__: (...)
13.  get __proto__: ƒ __proto__()
14.  set __proto__: ƒ __proto__()
```

You can view the prototype of any object using `person.__proto__` (which is depricated, we can instead make use of Object.getPrototypeOf(person))

**Shadowing properties:**
Only check the prototype if the property doesn't exist in the current object.

**Setting a prototype**

1. Object.create

```javascript
const person = {
  greet() {
    console.log("Hello");
  },
};
const me = Object.create(person);
me.greet(); //Hello
```

2. Constructor (Will discuss more in detail later)

# Inheritance

- JavaScript only supports Prototype Based Inheritance.
-
